import { useState } from 'react'
import Layout from '../../common/Layout'
import UserSidebar from '../../common/UserSidebar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/Config';
import toast from 'react-hot-toast';

function ChangePassword() {
      const [loading, setLoading] = useState(false);

      const { register, handleSubmit, formState: { errors }, reset, setError, watch } = useForm();

      const newPassword = watch("new_password");

      const onSubmit = async (data) => {
            setLoading(true);
            await fetch(`${apiUrl}/update-password`, {
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
                        if (result.status == 200) {
                              toast.success(result.message);
                              reset();
                        } else {
                              console.log("somthing went wrong");
                              const errors = result.errors;
                              Object.keys(errors).forEach(field => {
                                    setError(field, { message: errors[field][0] })
                              })
                        }
                  })
      }
      return (
            <Layout>
                  <>
                        {/* ── HERO BAND ── */}
                        <div className="dash-hero">
                              <div className="container position-relative">
                                    <nav aria-label="breadcrumb" className="mb-3">
                                          <ol className="breadcrumb mb-0" style={{ fontSize: "0.82rem" }}>
                                                <li className="breadcrumb-item"><Link to="#">Account</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">Password</li>
                                          </ol>
                                    </nav>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                          <div>
                                                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                                                      Change Password
                                                </h1>
                                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>Keep your account secure with a strong, unique password.</p>
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

                                                <div className="row g-4">
                                                      {/* Form card */}
                                                      <div className="col-lg-8">
                                                            <div className="form-card">
                                                                  <div className="form-card-header">
                                                                        <div className="form-card-icon" style={{ background: "#dbeafe" }}>
                                                                              <i className="bi bi-shield-lock" style={{ color: "#2563eb" }}></i>
                                                                        </div>
                                                                        <div>
                                                                              <div className="fw-bold" style={{ fontSize: "0.95rem" }}>Update Password</div>
                                                                              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Choose a password you haven't used before</div>
                                                                        </div>
                                                                  </div>

                                                                  <div className="form-card-body">
                                                                        <form onSubmit={handleSubmit(onSubmit)}>

                                                                              {/* Old password */}
                                                                              <div className="mb-3">
                                                                                    <label className="field-label">Current Password</label>
                                                                                    <div className="field-wrap">
                                                                                          <i className="bi bi-lock field-icon"></i>
                                                                                          <input
                                                                                                type="password"
                                                                                                placeholder="Your current password"
                                                                                                {...register("old_password", { required: "Old Password is required" })}
                                                                                                className={`form-control field-input ${errors.old_password ? "is-invalid" : ""}`}
                                                                                          />
                                                                                          {errors.old_password && <p className="invalid-feedback">{errors.old_password?.message}</p>}
                                                                                    </div>
                                                                              </div>

                                                                              <hr style={{ borderColor: "#f1f5f9", margin: "1.25rem 0" }} />

                                                                              {/* New password */}
                                                                              <div className="mb-3">
                                                                                    <label className="field-label">New Password</label>
                                                                                    <div className="field-wrap">
                                                                                          <i className="bi bi-lock-fill field-icon"></i>
                                                                                          <input
                                                                                                type="password"
                                                                                                placeholder="Create a new password"
                                                                                                {...register("new_password", { required: "New Password is required" })}
                                                                                                className={`form-control field-input ${errors.new_password ? "is-invalid" : ""}`}
                                                                                          />
                                                                                          {errors.new_password && <p className="invalid-feedback">{errors.new_password?.message}</p>}
                                                                                    </div>
                                                                              </div>

                                                                              {/* Confirm password */}
                                                                              <div className="mb-4">
                                                                                    <label className="field-label">Confirm New Password</label>
                                                                                    <div className="field-wrap">
                                                                                          <i className="bi bi-shield-check field-icon"></i>
                                                                                          <input
                                                                                                type="password"
                                                                                                placeholder="Repeat your new password"
                                                                                                {...register("confirm_new_password", {
                                                                                                      required: "Please confirm your new password",
                                                                                                      validate: value => value === newPassword || "Passwords do not match"
                                                                                                })}
                                                                                                className={`form-control field-input ${errors.confirm_new_password ? "is-invalid" : ""}`}
                                                                                          />
                                                                                          {errors.confirm_new_password && <p className="invalid-feedback">{errors.confirm_new_password?.message}</p>}
                                                                                    </div>
                                                                              </div>

                                                                              <button className="btn btn-save" type="submit" disabled={loading}>
                                                                                    {loading
                                                                                          ? <><span className="spinner-border spinner-border-sm me-2" />Updating…</>
                                                                                          : <><i className="bi bi-arrow-repeat me-1"></i>Change Password</>
                                                                                    }
                                                                              </button>
                                                                        </form>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      {/* Tips card */}
                                                      <div className="col-lg-4">
                                                            <div className="form-card">
                                                                  <div className="form-card-header">
                                                                        <div className="form-card-icon" style={{ background: "#dcfce7" }}>
                                                                              <i className="bi bi-lightbulb" style={{ color: "#16a34a" }}></i>
                                                                        </div>
                                                                        <div>
                                                                              <div className="fw-bold" style={{ fontSize: "0.95rem" }}>Password Tips</div>
                                                                              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Stay safe online</div>
                                                                        </div>
                                                                  </div>
                                                                  <div className="form-card-body">
                                                                        {[
                                                                              { icon: "bi-check-circle", color: "#22c55e", text: "At least 8 characters long" },
                                                                              { icon: "bi-check-circle", color: "#22c55e", text: "Mix uppercase & lowercase letters" },
                                                                              { icon: "bi-check-circle", color: "#22c55e", text: "Include numbers and symbols" },
                                                                              { icon: "bi-x-circle", color: "#ef4444", text: "Avoid using your name or email" },
                                                                              { icon: "bi-x-circle", color: "#ef4444", text: "Don't reuse old passwords" },
                                                                        ].map((tip, i) => (
                                                                              <div key={i} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: "0.83rem", color: "#374151" }}>
                                                                                    <i className={`bi ${tip.icon} mt-1`} style={{ color: tip.color, flexShrink: 0 }}></i>
                                                                                    {tip.text}
                                                                              </div>
                                                                        ))}

                                                                        <hr style={{ borderColor: "#f1f5f9", margin: "1rem 0" }} />

                                                                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                                                              <i className="bi bi-info-circle me-1 text-primary"></i>
                                                                              After changing your password you'll stay logged in on this device.
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                </div>

                                          </div>
                                    </div>
                              </div>
                        </div>
                  </>
            </Layout>
      )
}

export default ChangePassword