import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateLesson = ({ showLessonModal, handleCloseLessonModal, course }) => {
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, reset } = useForm();

      const onSubmit = async (data) => {
            setLoading(true);
            await fetch(`${apiUrl}/lessons`, {
                  method: "POST",
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
                        console.log(result)
                        if (result.status == 200) {
                              // setChapters({ type: "UPDATE_CHAPTER", payload: result.data });
                              toast.success(result.message);
                              reset({
                                    chapter: '',
                                    lesson: '',
                                    status: 1
                              });
                              handleCloseLessonModal();
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      return (
            <>
                  <Modal size='lg' show={showLessonModal} onHide={handleCloseLessonModal}>
                        <form onSubmit={handleSubmit(onSubmit)} >
                              <Modal.Header closeButton>
                                    <Modal.Title>Create Lesson</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                    <div className="mb-3">
                                          <label htmlFor="" className="form-label">Chapter</label>
                                          <select
                                                className={`form-select ${errors.chapter && "is-invalid"}`}
                                                {...register('chapter', { required: 'Please select a chapter' })}>

                                                <option value="">Select Chapter</option>
                                                {
                                                      course.chapters && course.chapters.map(chapter => {
                                                            return (
                                                                  <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                                                            )
                                                      })
                                                }
                                          </select>
                                          {errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                          <label htmlFor="" className="form-label">Lesson</label>
                                          <input
                                                type="text"
                                                className={`form-control ${errors.lesson && "is-invalid"}`}
                                                placeholder="Lesson"
                                                {...register('lesson', { required: 'Lesson is required' })} />
                                          {errors.lesson && <p className='invalid-feedback'>{errors.lesson.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                          <label htmlFor="" className="form-label">Status</label>
                                          <select
                                                {...register('status', { required: 'Status is required' })}
                                                className="form-select">
                                                <option value="1" selected>Active</option>
                                                <option value="0">Inactive</option>
                                          </select>
                                          {errors.status && <p className='invalid-feedback'>{errors.status.message}</p>}
                                    </div>
                              </Modal.Body>
                              <Modal.Footer>

                                    <Button variant="primary" type='submit' className='btn btn-primary' disabled={loading}>
                                          {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                              </Modal.Footer>
                        </form>
                  </Modal>
            </>
      )
}

export default CreateLesson