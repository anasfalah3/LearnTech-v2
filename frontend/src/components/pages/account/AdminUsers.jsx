import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiUrl, token } from '../../common/Config';

function AdminUsers() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [editingId, setEditingId] = useState(null);
      const [newRole, setNewRole] = useState('user');

      const fetchUsers = async (page) => {
            setLoading(true);
            try {
                  const response = await fetch(`${apiUrl}/admin/users?page=${page}`, {
                        headers: {
                              'Authorization': `Bearer ${token}`
                        }
                  });

                  const result = await response.json();
                  if (result.status === 200) {
                        setUsers(result.data.data);
                        setTotalPages(result.data.last_page);
                  }
            } catch (error) {
                  toast.error('Failed to fetch users');
                  console.error('Error:', error);
            } finally {
                  setLoading(false);
            }
      };

      const handleRoleChange = async (userId, role) => {
            try {
                  const response = await fetch(`${apiUrl}/admin/users/${userId}/role`, {
                        method: 'PUT',
                        headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ role: role })
                  });

                  const result = await response.json();
                  if (result.status === 200) {
                        toast.success(result.message);
                        setEditingId(null);
                        fetchUsers(currentPage);
                  }
            } catch (error) {
                  toast.error('Failed to update user role');
                  console.error('Error:', error);
            }
      };

      const handleDelete = async (userId) => {
            if (window.confirm('Are you sure you want to delete this user?')) {
                  try {
                        const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
                              method: 'DELETE',
                              headers: {
                                    'Authorization': `Bearer ${token}`
                              }
                        });

                        const result = await response.json();
                        if (result.status === 200) {
                              toast.success(result.message);
                              fetchUsers(currentPage);
                        }
                  } catch (error) {
                        toast.error('Failed to delete user');
                        console.error('Error:', error);
                  }
            }
      };

      useEffect(() => {
            fetchUsers(currentPage);
      }, [currentPage]);

      return (
            <div className="admin-section">
                  <div className="section-header">
                        <h2>Manage Users</h2>
                  </div>

                  {loading ? (
                        <p>Loading users...</p>
                  ) : (
                        <>
                              <table className="table table-striped">
                                    <thead>
                                          <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Joined</th>
                                                <th>Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {users.map(user => (
                                                <tr key={user.id}>
                                                      <td>{user.id}</td>
                                                      <td>{user.name}</td>
                                                      <td>{user.email}</td>
                                                      <td>
                                                            {editingId === user.id ? (
                                                                  <select
                                                                        className="form-select form-select-sm"
                                                                        value={newRole}
                                                                        onChange={(e) => setNewRole(e.target.value)}
                                                                  >
                                                                        <option value="user">User</option>
                                                                        <option value="admin">Admin</option>
                                                                  </select>
                                                            ) : (
                                                                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                                        {user.role}
                                                                  </span>
                                                            )}
                                                      </td>
                                                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                                      <td>
                                                            {editingId === user.id ? (
                                                                  <>
                                                                        <button
                                                                              className="btn btn-sm btn-success me-2"
                                                                              onClick={() => handleRoleChange(user.id, newRole)}
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
                                                                                    setEditingId(user.id);
                                                                                    setNewRole(user.role);
                                                                              }}
                                                                        >
                                                                              Edit
                                                                        </button>
                                                                        <button
                                                                              className="btn btn-sm btn-danger"
                                                                              onClick={() => handleDelete(user.id)}
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

export default AdminUsers;
