import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiUrl, token } from '../../common/Config';

function AdminCourses() {
      const [courses, setCourses] = useState([]);
      const [loading, setLoading] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [editingId, setEditingId] = useState(null);
      const [newStatus, setNewStatus] = useState('draft');

      const fetchCourses = async (page) => {
            setLoading(true);
            try {
                  const response = await fetch(`${apiUrl}/admin/courses?page=${page}`, {
                        headers: {
                              'Authorization': `Bearer ${token}`
                        }
                  });

                  const result = await response.json();
                  if (result.status === 200) {
                        setCourses(result.data.data);
                        setTotalPages(result.data.last_page);
                  }
            } catch (error) {
                  toast.error('Failed to fetch courses');
                  console.error('Error:', error);
            } finally {
                  setLoading(false);
            }
      };

      const handleStatusChange = async (courseId, status) => {
            try {
                  const response = await fetch(`${apiUrl}/admin/courses/${courseId}/status`, {
                        method: 'PUT',
                        headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: status })
                  });

                  const result = await response.json();
                  if (result.status === 200) {
                        toast.success(result.message);
                        setEditingId(null);
                        fetchCourses(currentPage);
                  }
            } catch (error) {
                  toast.error('Failed to update course status');
                  console.error('Error:', error);
            }
      };

      const handleDelete = async (courseId) => {
            if (window.confirm('Are you sure you want to delete this course?')) {
                  try {
                        const response = await fetch(`${apiUrl}/admin/courses/${courseId}`, {
                              method: 'DELETE',
                              headers: {
                                    'Authorization': `Bearer ${token}`
                              }
                        });

                        const result = await response.json();
                        if (result.status === 200) {
                              toast.success(result.message);
                              fetchCourses(currentPage);
                        }
                  } catch (error) {
                        toast.error('Failed to delete course');
                        console.error('Error:', error);
                  }
            }
      };

      const getStatusBadgeClass = (status) => {
            switch (status) {
                  case 'published':
                        return 'bg-success';
                  case 'draft':
                        return 'bg-warning';
                  case 'archived':
                        return 'bg-danger';
                  default:
                        return 'bg-secondary';
            }
      };

      useEffect(() => {
            fetchCourses(currentPage);
      }, [currentPage]);
      return (
            <div className="admin-section">
                  <div className="section-header">
                        <h2>Manage Courses</h2>
                  </div>

                  {loading ? (
                        <p>Loading courses...</p>
                  ) : (
                        <>
                              <div className="table-responsive">
                                    <table className="table table-striped">
                                          <thead>
                                                <tr>
                                                      <th>ID</th>
                                                      <th>Title</th>
                                                      <th>Category</th>
                                                      <th>Level</th>
                                                      <th>Language</th>
                                                      <th>Status</th>
                                                      <th>Enrollments</th>
                                                      <th>Created</th>
                                                      <th>Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {courses.map(course => (
                                                      <tr key={course.id}>
                                                            <td>{course.id}</td>
                                                            <td>{course.title}</td>
                                                            <td>{course.category?.name || 'N/A'}</td>
                                                            <td>{course.level?.name || 'N/A'}</td>
                                                            <td>{course.language?.name || 'N/A'}</td>
                                                            <td>
                                                                  {editingId === course.id ? (
                                                                        <select
                                                                              className="form-select form-select-sm"
                                                                              value={newStatus}
                                                                              onChange={(e) => setNewStatus(e.target.value)}
                                                                        >
                                                                              <option value="draft">Draft</option>
                                                                              <option value="published">Published</option>
                                                                              <option value="archived">Archived</option>
                                                                        </select>
                                                                  ) : (
                                                                        <span className={`badge ${getStatusBadgeClass(course.status)}`}>
                                                                              {course.status}
                                                                        </span>
                                                                  )}
                                                            </td>
                                                            <td>{course.enrollments?.length || 0}</td>
                                                            <td>{new Date(course.created_at).toLocaleDateString()}</td>
                                                            <td>
                                                                  {editingId === course.id ? (
                                                                        <>
                                                                              <button
                                                                                    className="btn btn-sm btn-success me-2"
                                                                                    onClick={() => handleStatusChange(course.id, newStatus)}
                                                                              >
                                                                                    Save
                                                                              </button>
                                                                              <button
                                                                                    className="btn btn-sm btn-secondary"
                                                                                    onClick={() => setEditingId(null)}
                                                                              >
                                                                                    Cancel
                                                                              </button>
                                                                        </>
                                                                  ) : (
                                                                        <>
                                                                              <button
                                                                                    className="btn btn-sm btn-warning me-2"
                                                                                    onClick={() => {
                                                                                          setEditingId(course.id);
                                                                                          setNewStatus(course.status);
                                                                                    }}
                                                                              >
                                                                                    Edit
                                                                              </button>
                                                                              <button
                                                                                    className="btn btn-sm btn-danger"
                                                                                    onClick={() => handleDelete(course.id)}
                                                                              >
                                                                                    Delete
                                                                              </button>
                                                                        </>
                                                                  )}
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>

                              {/* Pagination */}
                              <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button
                                                      className="page-link"
                                                      onClick={() => setCurrentPage(currentPage - 1)}
                                                      disabled={currentPage === 1}
                                                >
                                                      Previous
                                                </button>
                                          </li>
                                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                      <button
                                                            className="page-link"
                                                            onClick={() => setCurrentPage(page)}
                                                      >
                                                            {page}
                                                      </button>
                                                </li>
                                          ))}
                                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button
                                                      className="page-link"
                                                      onClick={() => setCurrentPage(currentPage + 1)}
                                                      disabled={currentPage === totalPages}
                                                >
                                                      Next
                                                </button>
                                          </li>
                                    </ul>
                              </nav>
                        </>
                  )}
            </div>
      );
}

export default AdminCourses;
