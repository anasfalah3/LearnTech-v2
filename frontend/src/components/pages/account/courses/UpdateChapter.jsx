import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function UpdateChapter({ chapterData, showChapter, handleClose, setChapters }) {

      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, reset } = useForm();
      const onSubmit = async (data) => {
            setLoading(true);
            await fetch(`${apiUrl}/chapters/${chapterData.id}`, {
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
                        console.log(result)
                        if (result.status == 200) {
                              setChapters({ type: "UPDATE_CHAPTER", payload: result.data });
                              toast.success(result.message);
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }
      useEffect(() => {
            if (chapterData) {
                  reset({
                        chapter: chapterData.title
                  });
            }
      }, [chapterData])

      return (
            <Modal size='lg' show={showChapter} onHide={handleClose}>
                  <form onSubmit={handleSubmit(onSubmit)} >
                        <Modal.Header closeButton>
                              <Modal.Title>Update Chapter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                              <div className="mb-3">
                                    <label htmlFor="" className="form-label">Chapter</label>
                                    <input
                                          type="text"
                                          className={`form-control ${errors.chapter && "is-invalid"}`}
                                          placeholder="Chapter"
                                          {...register('chapter', { required: 'Chapter is required' })} />
                                    {errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>}
                              </div>
                        </Modal.Body>
                        <Modal.Footer>

                              <Button variant="primary" type='submit' className='btn btn-primary' disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                              </Button>
                        </Modal.Footer>
                  </form>
            </Modal>
      )
}

export default UpdateChapter