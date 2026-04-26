import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../../common/Config';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function UpdateOutcome({ showOutcome, handleClose, outcomes, setOutcomes, outcomeData }) {
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, reset } = useForm();
      const onSubmit = async (data) => {
            setLoading(true);
            await fetch(`${apiUrl}/outcomes/${outcomeData.id}`, {
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
                              const updatedOutcomes = outcomes.map(outcome => outcome.id == result.data.id ? { ...outcome, text: result.data.text } : outcome);
                              setOutcomes(updatedOutcomes);
                              toast.success(result.message);
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      useEffect(() => {
            if (outcomeData) {
                  reset({
                        outcome: outcomeData.text
                  });
            }
      }, [outcomeData])
      return (
            <Modal size='lg' show={showOutcome} onHide={handleClose}>
                  <form onSubmit={handleSubmit(onSubmit)} >
                        <Modal.Header closeButton>
                              <Modal.Title>Update Outcome</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                              <div className="mb-3">
                                    <label htmlFor="" className="form-label">Outcome</label>
                                    <input
                                          type="text"
                                          className={`form-control ${errors.outcome && "is-invalid"}`}
                                          placeholder="Outcome"
                                          {...register('outcome', { required: 'Outcome is required' })} />
                                    {errors.outcome && <p className='invalid-feedback'>{errors.outcome.message}</p>}
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

export default UpdateOutcome