import { Link, useNavigate } from 'react-router-dom'
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from '../common/Config';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
function Login() {
      const { login } = useContext(AuthContext);
      const navigate = useNavigate();
      const { handleSubmit, register, formState: { errors } } = useForm();
      const onSubmit = async (data) => {
            await fetch(`${apiUrl}/login`, {
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
                              const userInfo = {
                                    name: result.name,
                                    email: result.email,
                                    id: result.id,
                                    token: result.token,
                                    role: result.role
                              }
                              localStorage.setItem("userInfoLearnTech", JSON.stringify(userInfo));
                              login(userInfo);
                              navigate('/account/dashboard')
                        } else {
                              toast.error(result.message);
                        }
                  })
      }
      return (
            <Layout>
                  <>
                        <div className="auth-page">
                              <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3 py-5" style={{ position: "relative", zIndex: 2 }}>
                                    <div className="auth-card">

                                          {/* Card Header */}
                                          <div className="auth-card-header">
                                                <a href="/" className="auth-brand">
                                                      <i className="bi bi-mortarboard-fill"></i>LearnTech
                                                </a>
                                                <div className="auth-badge"><i className="bi bi-lock-fill"></i>Secure Login</div>
                                                <h2 className="text-white fw-bold mb-1" style={{ fontSize: "1.5rem" }}>Welcome back</h2>
                                                <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginBottom: 0 }}>
                                                      Sign in to continue your learning journey.
                                                </p>
                                          </div>

                                          {/* Card Body */}
                                          <div className="auth-card-body">
                                                <form onSubmit={handleSubmit(onSubmit)}>

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
                                                      <div className="mb-1">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                  <label className="auth-label">Password</label>
                                                                  {/* <a href="/account/forgot-password" style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                                                                        Forgot password?
                                                                  </a> */}
                                                            </div>
                                                            <div className="input-icon-wrap">
                                                                  <i className="bi bi-lock input-icon"></i>
                                                                  <input
                                                                        {...register("password", { required: "The password field is required" })}
                                                                        type="password"
                                                                        className={`form-control auth-input ${errors.password ? "is-invalid" : ""}`}
                                                                        placeholder="Enter your password"
                                                                  />
                                                                  {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
                                                            </div>
                                                      </div>

                                                      <button type="submit" className="btn btn-auth mt-4">
                                                            Sign In <i className="bi bi-arrow-right ms-1"></i>
                                                      </button>
                                                </form>

                                                <p className="auth-footer-text">
                                                      Don't have an account? <Link to="/account/register">Create one free</Link>
                                                </p>

                                                <div className="auth-divider">Safe &amp; encrypted</div>
                                                <div className="d-flex justify-content-center gap-3">
                                                      {["shield-lock", "patch-check", "lock"].map((icon) => (
                                                            <span key={icon} style={{ color: "#94a3b8", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
                                                                  <i className={`bi bi-${icon}`} style={{ color: "#a5b4fc" }}></i>
                                                                  {icon === "shield-lock" ? "SSL Secured" : icon === "patch-check" ? "Verified" : "Private"}
                                                            </span>
                                                      ))}
                                                </div>
                                          </div>

                                    </div>
                              </div>
                        </div>

                  </>
            </Layout>
      )
}

export default Login