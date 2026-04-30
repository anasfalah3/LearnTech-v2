import { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import toast from "react-hot-toast";
import Accordion from 'react-bootstrap/Accordion';
import UpdateChapter from './UpdateChapter';
import CreateLesson from './CreateLesson';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';



function ManageChapter({ course, params }) {
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, reset } = useForm();
      const [chapterData, setChapterData] = useState();

      //Update Chapter Modal
      const [showChapter, setShowChapter] = useState(false);
      const handleClose = () => setShowChapter(false);
      const handleShow = (chapter) => {
            setShowChapter(true);
            setChapterData(chapter);
      }


      //Update Lesson Modal
      const [showLessonModal, setShowLessonModal] = useState(false);
      const handleCloseLessonModal = () => setShowLessonModal(false);
      const handleShowLessonModal = () => {
            setShowLessonModal(true);
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
      const deleteChapter = async (id) => {
            if (confirm("Are you sure you want to delete this chapter?")) {
                  await fetch(`${apiUrl}/chapters/${id}`, {
                        method: "DELETE",
                        headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': `Bearer ${token}`
                        },
                  })
                        .then(res => res.json())
                        .then(result => {
                              console.log(result)
                              if (result.status == 200) {
                                    setChapters({ type: "DELETE_CHAPTER", payload: id });
                                    toast.success(result.message);
                              } else {
                                    console.log("somthing went wrong")
                              }
                        })
            }
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
                                    <div className="d-flex justify-content-between w-100">
                                          <h4 className="h5 border-bottom pb-3 mb-3">Chapters</h4>
                                          <Link onClick={() => handleShowLessonModal(course)}><FaPlus size={12} /> <strong>Add Lesson</strong></Link>
                                    </div>
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
                                                                  <div className="row">
                                                                        <div className="col-md-12">

                                                                              <div className="d-flex justify-content-between mb-2 mt-4">
                                                                                    <h4 className="h5">Lessons</h4>
                                                                                    <a className="h6" href="#" data-discover="true"></a>
                                                                                    <strong>Reorder Lessons</strong>
                                                                              </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                              {
                                                                                    chapter.lessons && chapter.lessons.map((lesson) => {
                                                                                          return (
                                                                                                <div className='card shadow px-3 py-2 mb-2'>
                                                                                                      <div className="row">
                                                                                                            <div className="col-md-7">
                                                                                                                  {lesson.title}
                                                                                                            </div>
                                                                                                            <div className="col-md-5 text-end">
                                                                                                                  {
                                                                                                                        lesson.duration > 0 && <small className='fw-bold text-muted me-2'>20 Min</small>
                                                                                                                  }
                                                                                                                  {
                                                                                                                        lesson.is_free_preview == "yes" && <div className="badge bg-success">Preview</div>
                                                                                                                  }


                                                                                                                  <Link to="#" className='ms-2'><BsPencilSquare size={14} /></Link>
                                                                                                                  <Link to="#" className='ms-2 text-danger'><FaTrashAlt size={14} /></Link>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                </div>
                                                                                          )
                                                                                    })
                                                                              }

                                                                        </div>
                                                                        <div className="col-md-12 mt-3">
                                                                              <div className="d-flex">
                                                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteChapter(chapter.id)}>Delete Chapter</button>
                                                                                    <button className="btn btn-primary btn-sm ms-2" onClick={() => handleShow(chapter)}>Update Chapter</button>
                                                                              </div>
                                                                        </div>
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
                  <CreateLesson
                        showLessonModal={showLessonModal}
                        handleCloseLessonModal={handleCloseLessonModal}
                        course={course}
                  />
            </>
      )
}

export default ManageChapter