import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { apiUrl, token } from "../../../common/Config";
import { MdDragIndicator } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import UpdateRequirement from "./UpdateRequirement";

function ManageRequirement() {
      const [loading, setLoading] = useState(false);
      const [requirements, setRequirements] = useState([]);
      const [requirementData, setRequirementData] = useState([]);
      const { register, handleSubmit, formState: { errors }, reset } = useForm();
      const params = useParams();

      const [showRequirement, setShowRequirement] = useState(false);
      const handleClose = () => setShowRequirement(false);
      const handleShow = (requirement) => {
            setShowRequirement(true);
            setRequirementData(requirement);
      }
      const onSubmit = async (data) => {
            setLoading(true);
            const formData = { ...data, course_id: params.id }

            await fetch(`${apiUrl}/requirements`, {
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
                              const newRequirement = [...requirements, result.data];
                              setRequirements(newRequirement);
                              toast.success(result.message);
                              reset();
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }
      const fetchRequirements = async () => {

            await fetch(`${apiUrl}/requirements?course_id=${params.id}`, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
            })
                  .then(res => res.json())
                  .then(result => {
                        setLoading(false);
                        console.log("requirements : ")
                        console.log(result)
                        if (result.status == 200) {
                              setRequirements(result.data);
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }

      const deleteRequirement = async (id) => {
            if (confirm("Are you sure you want to delete this requirement?")) {
                  await fetch(`${apiUrl}/requirements/${id}`, {
                        method: "DELETE",
                        headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': `Bearer ${token}`
                        },
                  })
                        .then(res => res.json())
                        .then(result => {
                              setLoading(false);
                              console.log(result)
                              if (result.status == 200) {
                                    const newRequirements = requirements.filter(requirement => requirement.id != id);
                                    setRequirements(newRequirements);
                                    toast.success(result.message);
                              } else {
                                    console.log("somthing went wrong")
                              }
                        })
            }
      }

      useEffect(() => {
            fetchRequirements();
      }, [])
      return (
            <>
                  <div className="card shadow-lg border-0 mt-4">
                        <div className="card-body p-4">
                              <div className="d-flex">
                                    <h4 className="h5 border-bottom pb-3 mb-3">Requirement</h4>
                              </div>
                              <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                          <input
                                                type="text"
                                                className={`form-control ${errors.requirement && "is-invalid"}`}
                                                placeholder="Requirement"
                                                {...register('requirement', { required: 'Requirement is required' })} />
                                          {errors.requirement && <p className='invalid-feedback'>{errors.requirement.message}</p>}
                                    </div>
                                    <button className='btn btn-primary' disabled={loading}>
                                          {loading ? 'Saving...' : 'Save'}
                                    </button>
                              </form>
                              {
                                    requirements && requirements.map(requirement => {
                                          return (
                                                <div key={`requirement-${requirement.id}`} className="card shadow mb-2">
                                                      <div className="card-body p-2 d-flex">
                                                            <div>
                                                                  <MdDragIndicator />
                                                            </div>
                                                            <div className="d-flex justify-content-between w-100">
                                                                  <div className="ps-2">{requirement.text}</div>
                                                                  <div className='d-flex'>
                                                                        <Link onClick={() => handleShow(requirement)} className="text-primary me-1">
                                                                              <BsPencilSquare />
                                                                        </Link>
                                                                        <Link onClick={() => deleteRequirement(requirement.id)} className="text-danger">
                                                                              <FaTrashAlt />
                                                                        </Link>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          )
                                    })
                              }

                        </div>
                  </div>
                  <UpdateRequirement
                        showRequirement={showRequirement}
                        handleClose={handleClose}
                        requirements={requirements}
                        setRequirements={setRequirements}
                        requirementData={requirementData}
                  />
            </>
      )
}

export default ManageRequirement