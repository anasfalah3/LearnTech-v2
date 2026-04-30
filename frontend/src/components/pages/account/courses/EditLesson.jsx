import { useEffect, useState, useRef, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import Layout from "../../../common/Layout"
import UserSidebar from "../../../common/UserSidebar"
import { useForm } from "react-hook-form"
import { apiUrl, token } from "../../../common/Config"
import JoditEditor from 'jodit-react';
import toast from "react-hot-toast"

function EditLesson({ placeholder }) {
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, setError, reset } = useForm()
      const [chapters, setChapters] = useState([]);
      const [lesson, setLesson] = useState(null);
      const params = useParams()

      const editor = useRef(null);
      const [content, setContent] = useState('');
      const [checked, setChecked] = useState(false);

      const config = useMemo(
            () => ({
                  readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                  placeholder: placeholder || 'Start typings...'
            }),
            [placeholder]
      );
      const onSubmit = (data) => {
            setLoading(true);
            data.description = content;
            fetch(`${apiUrl}/lessons/${params.id}`, {
                  method: "PUT",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(data)

            })
                  .then(res => res.json())
                  .then(result => {
                        setLoading(false);
                        if (result.status == 200) {
                              toast.success(result.message);
                        } else {
                              console.log("something went wrong");
                        }
                  })
            // console.log(data)
      }
      useEffect(() => {
            fetch(`${apiUrl}/chapters?course_id=${params.courseId}`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  }
            })
                  .then(res => res.json())
                  .then(result => {
                        if (result.status == 200) {
                              console.log(result);
                              setChapters(result.data)
                        } else {
                              console.log("something went wrong");
                        }
                  })
            fetch(`${apiUrl}/lessons/${params.id}`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  }
            })
                  .then(res => res.json())
                  .then(result => {
                        if (result.status == 200) {
                              console.log(result);
                              setLesson(result.data)
                              reset({
                                    lesson: result.data.title,
                                    chapter_id: result.data.chapter_id,
                                    status: result.data.status,
                                    duration: result.data.duration,
                              })
                              setContent(result.data.description)
                              setChecked(result.data.is_free_preview == "yes" ? true : false)
                        } else {
                              console.log("something went wrong");
                        }
                  })
      }, [])
      return (
            <Layout>
                  <section className='section-4'>
                        <div className='container pb-5 pt-3'>
                              <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                          <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
                                          <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                              </nav>
                              <div className='row'>
                                    <div className='col-md-12 mt-5 mb-3'>
                                          <div className='d-flex justify-content-between'>
                                                <h2 className='h4 mb-0 pb-0'>Dashboard</h2>
                                          </div>
                                    </div>
                                    <div className='col-lg-3 account-sidebar'>
                                          <UserSidebar />
                                    </div>
                                    <div className='col-lg-9'>
                                          <div className='row'>

                                                <div className="col-md-8">
                                                      <form onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="card border-0 shadow-lg">
                                                                  <div className="card-body p-4">
                                                                        <h4 className="h5 border-bottom pb-3 mb-3">Basic Information</h4>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="title">Title</label>
                                                                              <input type="text"
                                                                                    className={`form-control ${errors.lesson && "is-invalid"}`}
                                                                                    placeholder='Title'
                                                                                    {...register('lesson', { required: 'Title is required' })} />
                                                                              {errors.lesson && <p className='invalid-feedback'>{errors.lesson.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="chapter">Chapter</label>
                                                                              <select
                                                                                    className={`form-select ${errors.chapter_id && "is-invalid"}`}
                                                                                    id='chapter'
                                                                                    {...register('chapter_id', { required: 'Please Select a chapter' })}>
                                                                                    <option value="">Select a Chapter</option>
                                                                                    {chapters && chapters.map(chapter => (
                                                                                          <option value={chapter.id} key={chapter.id}>{chapter.title}</option>
                                                                                    ))}
                                                                              </select>
                                                                              {errors.chapter_id && <p className='invalid-feedback'>{errors.chapter_id.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="duration">Duration(Min)</label>
                                                                              <input type="text"
                                                                                    className={`form-control ${errors.duration && "is-invalid"}`}
                                                                                    placeholder='Duration'
                                                                                    {...register('duration', { required: 'Duration is required' })} />
                                                                              {errors.duration && <p className='invalid-feedback'>{errors.duration.message}</p>}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="duration">Description</label>
                                                                              <JoditEditor
                                                                                    ref={editor}
                                                                                    value={content}
                                                                                    config={config}
                                                                                    tabIndex={1} // tabIndex of textarea
                                                                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                                    onChange={newContent => { }}
                                                                              />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                              <label className="form-label" htmlFor="duration">Status</label>
                                                                              <select className="form-select" {...register('status', { required: 'Please select a status' })}>
                                                                                    <option value="1">Active</option>
                                                                                    <option value="0">Inactive</option>
                                                                              </select>
                                                                        </div>
                                                                        <div className="d-flex mb-3">
                                                                              <input {...register('free_preview')} checked={checked} onChange={(e) => { setChecked(e.target.checked) }} className="form-check-input" type="checkbox" id="FreePreview" />
                                                                              <label className="form-check-label ms-2" htmlFor="FreePreview">Free Preview</label>
                                                                        </div>

                                                                        <button className='btn btn-primary mt-4' disabled={loading}>
                                                                              {loading ? 'Updating...' : 'Update'}
                                                                        </button>

                                                                  </div>
                                                            </div>
                                                      </form>
                                                </div>

                                          </div>

                                    </div>
                              </div>
                        </div>
                  </section>
            </Layout >
      )
}

export default EditLesson