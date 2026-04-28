import { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import toast from "react-hot-toast";
import Accordion from 'react-bootstrap/Accordion';
import UpdateChapter from './UpdateChapter';



function ManageChapter({ course, params }) {
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, reset } = useForm();

      const [showChapter, setShowChapter] = useState(false);
      const [chapterData, setChapterData] = useState();

      const handleClose = () => setShowChapter(false);
      const handleShow = (chapter) => {
            setShowChapter(true);
            setChapterData(chapter);
      }

      const chapterReducer = (state, action) => {
            switch (action.type) {
                  case "SET_CHAPTERS":
                        return action.payload;
                  case "ADD_CHAPTER":
                        return [...state, action.payload];
                  case "UPDATE_CHAPTER":
                        return state.map(chapter => {
                              if (chapter.id === action.payload.id) {
                                    return action.payload;
                              }
                              return chapter
                        });
                  case "DELETE_CHAPTER":
                        return state.filter(chapter => chapter.id != action.payload);
                  default:
                        return state;
            }
      }

      const [chapters, setChapters] = useReducer(chapterReducer, []);

      const onSubmit = async (data) => {
            setLoading(true);
            const formData = { ...data, course_id: params.id }

            await fetch(`${apiUrl}/chapters`, {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(formData)
            })
                  .then(res => res.json())
                  .then(result => {
                        setLoading(false);
                        console.log(result)
                        if (result.status == 200) {
                              // const newOutcome = [...outcomes, result.data];
                              // setOutcomes(newOutcome);
                              setChapters({ type: "ADD_CHAPTER", payload: result.data });
                              toast.success(result.message);
                              reset();
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      useEffect(() => {
            if (course.chapters) {
                  setChapters({ type: "SET_CHAPTERS", payload: course.chapters })
            }
      }, [course])

      return (
            <>
                  <div className="card shadow-lg border-0 mt-4">
                        <div className="card-body p-4">
                              <div className="d-flex">
                                    <h4 className="h5 border-bottom pb-3 mb-3">Chapters</h4>
                              </div>
                              <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                          <input
                                                type="text"
                                                className={`form-control ${errors.chapter && "is-invalid"}`}
                                                placeholder="Chapter"
                                                {...register('chapter', { required: 'Chapter is required' })} />
                                          {errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>}
                                    </div>
                                    <button className='btn btn-primary' disabled={loading}>
                                          {loading ? 'Saving...' : 'Save'}
                                    </button>
                              </form>

                              <Accordion>
                                    {
                                          chapters.map((chapter, index) => {
                                                return (
                                                      <Accordion.Item eventKey={index} key={index}>
                                                            <Accordion.Header>{chapter.title}</Accordion.Header>
                                                            <Accordion.Body>
                                                                  <div className="d-flex">
                                                                        <button className="btn btn-danger btn-sm">Delete Chapter</button>
                                                                        <button className="btn btn-primary btn-sm ms-2" onClick={() => handleShow(chapter)}>Update Chapter</button>
                                                                  </div>
                                                            </Accordion.Body>
                                                      </Accordion.Item>
                                                )
                                          })
                                    }
                              </Accordion>
                        </div>
                  </div>
                  <UpdateChapter
                        chapterData={chapterData}
                        showChapter={showChapter}
                        handleClose={handleClose}
                        setChapters={setChapters}
                  />
            </>
      )
}

export default ManageChapter