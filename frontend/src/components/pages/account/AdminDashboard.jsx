import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../../common/Layout';
import { apiUrl, token } from '../../common/Config';
import AdminCategories from './AdminCategories';
import AdminLevels from './AdminLevels';
import AdminUsers from './AdminUsers';
import AdminCourses from './AdminCourses';
import '../../../assets/admin.css';
import UserSidebar from '../../common/UserSidebar';

function AdminDashboard() {
      const navigate = useNavigate();
      const [activeTab, setActiveTab] = useState('stats');
      const [stats, setStats] = useState(null);
      const [loading, setLoading] = useState(true);

      const fetchStats = async () => {
            try {
                  const response = await fetch(`${apiUrl}/admin/dashboard-stats`, {
                        headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': `Bearer ${token}`
                        }
                  });

                  const result = await response.json();
                  if (result.status == 200) {
                        setStats(result.data);
                  } else if (result.status == 403) {
                        toast.error('Admin access required');
                        navigate('/');
                  }
            } catch (error) {
                  toast.error('Failed to fetch statistics');
                  console.error('Error:', error);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchStats();
      }, []);


      if (loading) {
            return <Layout><div className="text-center mt-5">Loading...</div></Layout>;
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
                                                <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                                          </ol>
                                    </nav>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                          <div>
                                                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                                                      Admin Dashboard
                                                </h1>
                                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 0 }}>
                                                      Manage your platform content and users.
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
                                                {/* Navigation Tabs */}
                                                <div className="admin-tabs">
                                                      <button
                                                            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                                                            onClick={() => setActiveTab('stats')}
                                                      >
                                                            Statistics
                                                      </button>
                                                      <button
                                                            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
                                                            onClick={() => setActiveTab('categories')}
                                                      >
                                                            Categories
                                                      </button>
                                                      <button
                                                            className={`tab-btn ${activeTab === 'levels' ? 'active' : ''}`}
                                                            onClick={() => setActiveTab('levels')}
                                                      >
                                                            Levels
                                                      </button>
                                                      <button
                                                            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                                                            onClick={() => setActiveTab('users')}
                                                      >
                                                            Users
                                                      </button>
                                                      <button
                                                            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                                                            onClick={() => setActiveTab('courses')}
                                                      >
                                                            Courses
                                                      </button>
                                                </div>

                                                {/* Tab Content */}
                                                <div className="admin-content">
                                                      {/* Statistics Tab */}
                                                      {activeTab === 'stats' && stats && (
                                                            <div className="stats-grid">
                                                                  <div className="stat-card">
                                                                        <h3>Total Users</h3>
                                                                        <p className="stat-number">{stats.total_users}</p>
                                                                  </div>
                                                                  <div className="stat-card">
                                                                        <h3>Total Admins</h3>
                                                                        <p className="stat-number">{stats.total_admins}</p>
                                                                  </div>
                                                                  <div className="stat-card">
                                                                        <h3>Total Courses</h3>
                                                                        <p className="stat-number">{stats.total_courses}</p>
                                                                  </div>
                                                                  <div className="stat-card">
                                                                        <h3>Published Courses</h3>
                                                                        <p className="stat-number">{stats.published_courses}</p>
                                                                  </div>
                                                                  <div className="stat-card">
                                                                        <h3>Total Categories</h3>
                                                                        <p className="stat-number">{stats.total_categories}</p>
                                                                  </div>
                                                                  <div className="stat-card">
                                                                        <h3>Total Levels</h3>
                                                                        <p className="stat-number">{stats.total_levels}</p>
                                                                  </div>

                                                                  {/* Recent Users */}
                                                                  <div className="stat-card full-width">
                                                                        <h3>Recent Users</h3>
                                                                        <table className="table table-sm">
                                                                              <thead>
                                                                                    <tr>
                                                                                          <th>Name</th>
                                                                                          <th>Email</th>
                                                                                          <th>Role</th>
                                                                                          <th>Joined</th>
                                                                                    </tr>
                                                                              </thead>
                                                                              <tbody>
                                                                                    {stats.recent_users && stats.recent_users.map(user => (
                                                                                          <tr key={user.id}>
                                                                                                <td>{user.name}</td>
                                                                                                <td>{user.email}</td>
                                                                                                <td>
                                                                                                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                                                                            {user.role}
                                                                                                      </span>
                                                                                                </td>
                                                                                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                                                                          </tr>
                                                                                    ))}
                                                                              </tbody>
                                                                        </table>
                                                                  </div>
                                                            </div>
                                                      )}

                                                      {/* Categories Tab */}
                                                      {activeTab === 'categories' && <AdminCategories />}

                                                      {/* Levels Tab */}
                                                      {activeTab === 'levels' && <AdminLevels />}

                                                      {/* Users Tab */}
                                                      {activeTab === 'users' && <AdminUsers />}

                                                      {/* Courses Tab */}
                                                      {activeTab === 'courses' && <AdminCourses />}
                                                </div>

                                          </div>
                                    </div>
                              </div>
                        </div>


                  </>
            </Layout>
      );
}

export default AdminDashboard;
