import { Link } from "react-router-dom"
import Layout from "../../common/Layout"
import UserSidebar from "../../common/UserSidebar"

function Dashboard() {
      const stats = [
            { value: "0", label: "Total Sales", icon: "bi-cash-stack", color: "#ede9fe", iconColor: "#7c3aed", footer: null },
            { value: "0", label: "Enrolled Users", icon: "bi-people", color: "#dbeafe", iconColor: "#2563eb", footer: null },
            { value: "0", label: "Active Courses", icon: "bi-display", color: "#dcfce7", iconColor: "#16a34a", footer: { label: "View Courses", to: "/admin/courses" } },
      ];

      return (
            <Layout>
                  <>
                        {/* ── HERO BAND ── */}
                        <div className="dash-hero">
                              <div className="container position-relative">
                                    <nav aria-label="breadcrumb" className="mb-3">
                                          <ol className="breadcrumb mb-0" style={{ fontSize: "0.82rem" }}>
                                                <li className="breadcrumb-item"><Link to="#">Account</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                          </ol>
                                    </nav>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                          <div>
                                                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                                                      Dashboard
                                                </h1>
                                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>
                                                      Welcome back,  Here's your<span style={{ color: "#a5b4fc", fontWeight: 600 }}> learning</span> overview.
                                                </p>
                                          </div>
                                          <Link to="/account/my-courses" className="btn btn-sm px-4 fw-semibold"
                                                style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 100, fontSize: "0.83rem" }}>
                                                <i className="bi bi-plus me-1"></i>New Course
                                          </Link>
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

                                                {/* Stat Cards */}
                                                <div className="row g-3 mb-4">
                                                      {stats.map((stat, i) => (
                                                            <div className="col-md-4" key={i}>
                                                                  <div className="stat-card">
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                              <div className="stat-icon-wrap" style={{ background: stat.color }}>
                                                                                    <i className={`bi ${stat.icon}`} style={{ color: stat.iconColor }}></i>
                                                                              </div>
                                                                              <span style={{ fontSize: "0.7rem", color: "#94a3b8", background: "#f8fafc", padding: "3px 10px", borderRadius: 100, border: "1px solid #e2e8f0" }}>
                                                                                    This month
                                                                              </span>
                                                                        </div>
                                                                        <div>
                                                                              <div className="stat-value">{stat.value}</div>
                                                                              <div className="stat-label">{stat.label}</div>
                                                                        </div>
                                                                        <div className="stat-footer">
                                                                              {stat.footer
                                                                                    ? <Link to={stat.footer.to}>{stat.footer.label} <i className="bi bi-arrow-right ms-1"></i></Link>
                                                                                    : <span style={{ color: "#cbd5e1" }}>No data yet</span>
                                                                              }
                                                                        </div>
                                                                  </div>
                                                            </div>
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

export default Dashboard