import { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import UserSidebar from '../../common/UserSidebar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/Config';
import toast from 'react-hot-toast';
import Loading from '../../common/Loading';

function Profile() {

      const [user, setUser] = useState([]);
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();

      const fetchUser = async () => {
            setLoading(true);
            await fetch(`${apiUrl}/fetch-user`, {
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
                        if (result.status == 200) {
                              setUser(result.data);
                              reset({
                                    name: result.data.name,
                                    email: result.data.email
                              })
                        } else {
                              console.log("somthing went wrong")
                        }
                  })
      }


      const onSubmit = async (data) => {
            await fetch(`${apiUrl}/update-user`, {
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
                        if (result.status == 200) {
                              toast.success(result.message);
                        } else {
                              console.log("somthing went wrong");
                              const errors = result.errors;
                              Object.keys(errors).forEach(field => {
                                    setError(field, { message: errors[field][0] })
                              })
                        }
                  })
      }

      useEffect(() => {
            fetchUser()
      }, [])

      return (
            <Layout>
                  <>
                        {/* ── HERO BAND ── */}
                        <div className="dash-hero">
                              <div className="container position-relative">
                                    <nav aria-label="breadcrumb" className="mb-3">
                                          <ol className="breadcrumb mb-0" style={{ fontSize: "0.82rem" }}>
                                                <li className="breadcrumb-item"><Link to="#">Account</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                          </ol>
                                    </nav>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                          <div>
                                                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                                                      Profile
                                                </h1>
                                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>Manage your personal information and account details.</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        {/* ── BODY ── */}
                        <div style={{ background: "var(--surface)", minHeight: "60vh" }} className="py-4 pb-5">
                              <div className="container">
                                    <div className="row g-4 align-items-start">

                                          {/* ── SIDEBAR ── */}
                                          <div className="col-lg-3">
                                                <UserSidebar />
                                          </div>

                                          {/* ── MAIN CONTENT ── */}
                                          <div className="col-lg-9">

                                                {loading ? <Loading /> : (
                                                      <div className="form-card">
                                                            {/* Header */}
                                                            <div className="form-card-header">
                                                                  <div className="form-card-icon" style={{ background: "#ede9fe" }}>
                                                                        <i className="bi bi-person" style={{ color: "#7c3aed" }}></i>
                                                                  </div>
                                                                  <div>
                                                                        <div className="fw-bold" style={{ fontSize: "0.95rem" }}>Personal Information</div>
                                                                        <div className="text-muted" style={{ fontSize: "0.8rem" }}>Update your name, email and avatar</div>
                                                                  </div>
                                                            </div>

                                                            <div className="form-card-body">
                                                                  <form onSubmit={handleSubmit(onSubmit)}>
                                                                        <div className="row g-3 mb-3">
                                                                              {/* Name */}
                                                                              <div className="col-md-12">
                                                                                    <label className="field-label">Full Name</label>
                                                                                    <div className="field-wrap">
                                                                                          <i className="bi bi-person field-icon"></i>
                                                                                          <input
                                                                                                type="text"
                                                                                                placeholder="Your full name"
                                                                                                {...register("name", { required: "Name is required" })}
                                                                                                className={`form-control field-input ${errors.name ? "is-invalid" : ""}`}
                                                                                          />
                                                                                          {errors.name && <p className="invalid-feedback">{errors.name?.message}</p>}
                                                                                    </div>
                                                                              </div>

                                                                              {/* Email */}
                                                                              <div className="col-md-12">
                                                                                    <label className="field-label">Email Address</label>
                                                                                    <div className="field-wrap">
                                                                                          <i className="bi bi-envelope field-icon"></i>
                                                                                          <input
                                                                                                type="email"
                                                                                                placeholder="your@email.com"
                                                                                                {...register("email", {
                                                                                                      required: "The email field is required",
                                                                                                      pattern: {
                                                                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                                                            message: "Invalid email address"
                                                                                                      }
                                                                                                })}
                                                                                                className={`form-control field-input ${errors.email ? "is-invalid" : ""}`}
                                                                                          />
                                                                                          {errors.email && <p className="invalid-feedback">{errors.email?.message}</p>}
                                                                                    </div>
                                                                              </div>
                                                                        </div>

                                                                        {/* Info tip */}
                                                                        <div className="tip-box mb-4">
                                                                              <i className="bi bi-info-circle me-2"></i>
                                                                              Your email is used for login and notifications.
                                                                        </div>

                                                                        {/* Actions */}
                                                                        <div className="d-flex gap-2 align-items-center">
                                                                              <button type="submit" className="btn btn-save">
                                                                                    <i className="bi bi-check2 me-1"></i>Save Changes
                                                                              </button>
                                                                        </div>
                                                                  </form>
                                                            </div>
                                                      </div>
                                                )}

                                          </div>
                                    </div>
                              </div>
                        </div>
                  </>
            </Layout>
      )
}

export default Profile