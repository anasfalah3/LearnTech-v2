import { Link, useNavigate } from 'react-router-dom'
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from '../common/Config';
import toast from 'react-hot-toast';

function Register() {
      const navigate = useNavigate();
      const {
            handleSubmit, register, formState: { errors }, setError
      } = useForm();
      const onSubmit = async (data) => {
            await fetch(`${apiUrl}/register`, {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                  },
                  body: JSON.stringify(data)
            })
                  .then(res => res.json())
                  .then(result => {
                        console.log(result)
                        if (result.status == 200) {
                              toast.success(result.message);
                              navigate('/account/login')
                        } else {
                              const errors = result.errors;
                              Object.keys(errors).forEach(field => {
                                    setError(field, { message: errors[field][0] })
                              })
                        }
                  })
      }
      return (
            <Layout>
                  <div className="auth-page">
                        <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3 py-5" style={{ position: "relative", zIndex: 2 }}>
                              <div className="auth-card">

                                    {/* Card Header */}
                                    <div className="auth-card-header">
                                          <a href="/" className="auth-brand">
                                                <i className="bi bi-mortarboard-fill"></i>LearnTech
                                          </a>
                                          <div className="auth-badge"><i className="bi bi-stars"></i>Free Account</div>
                                          <h2 className="text-white fw-bold mb-1" style={{ fontSize: "1.5rem" }}>Create your account</h2>
                                          <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginBottom: 0 }}>
                                                Join 50,000+ learners and start for free today.
                                          </p>
                                    </div>

                                    {/* Card Body */}
                                    <div className="auth-card-body">

                                          {/* Perks */}
                                          <div className="d-flex gap-3 mb-4 flex-wrap">
                                                {["7-day free trial", "Cancel anytime", "500+ free courses"].map((perk) => (
                                                      <span key={perk} style={{ fontSize: "0.75rem", color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                                                            <i className="bi bi-check-circle-fill" style={{ color: "#22c55e" }}></i>{perk}
                                                      </span>
                                                ))}
                                          </div>

                                          <form onSubmit={handleSubmit(onSubmit)}>

                                                {/* Name */}
                                                <div className="mb-3">
                                                      <label className="auth-label">Full Name</label>
                                                      <div className="input-icon-wrap">
                                                            <i className="bi bi-person input-icon"></i>
                                                            <input
                                                                  {...register("name", { required: "The name field is required" })}
                                                                  type="text"
                                                                  className={`form-control auth-input ${errors.name ? "is-invalid" : ""}`}
                                                                  placeholder="Your full name"
                                                            />
                                                            {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                                                      </div>
                                                </div>

                                                {/* Email */}
                                                <div className="mb-3">
                                                      <label className="auth-label">Email Address</label>
                                                      <div className="input-icon-wrap">
                                                            <i className="bi bi-envelope input-icon"></i>
                                                            <input
                                                                  {...register("email", {
                                                                        required: "The email field is required",
                                                                        pattern: {
                                                                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                              message: "Invalid email address"
                                                                        }
                                                                  })}
                                                                  type="text"
                                                                  className={`form-control auth-input ${errors.email ? "is-invalid" : ""}`}
                                                                  placeholder="you@example.com"
                                                            />
                                                            {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
                                                      </div>
                                                </div>

                                                {/* Password */}
                                                <div className="mb-4">
                                                      <label className="auth-label">Password</label>
                                                      <div className="input-icon-wrap">
                                                            <i className="bi bi-lock input-icon"></i>
                                                            <input
                                                                  {...register("password", { required: "The password field is required" })}
                                                                  type="password"
                                                                  className={`form-control auth-input ${errors.password ? "is-invalid" : ""}`}
                                                                  placeholder="Create a strong password"
                                                            />
                                                            {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
                                                      </div>
                                                </div>

                                                <button type="submit" className="btn btn-auth">
                                                      Create Account <i className="bi bi-arrow-right ms-1"></i>
                                                </button>
                                          </form>

                                          <p className="auth-footer-text">
                                                Already have an account? <Link to="/account/login">Sign in</Link>
                                          </p>
                                    </div>

                              </div>
                        </div>
                  </div>
            </Layout>
      )
}

export default Register