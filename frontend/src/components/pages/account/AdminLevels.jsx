import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiUrl, token } from '../../common/Config';

function AdminLevels() {
      const [levels, setLevels] = useState([]);
      const [loading, setLoading] = useState(false);
      const [showForm, setShowForm] = useState(false);
      const [formData, setFormData] = useState({ name: '' });
      const [editingId, setEditingId] = useState(null);


      const fetchLevels = async () => {
            setLoading(true);
            try {
                  const response = await fetch(`${apiUrl}/admin/levels`, {
                        headers: {
                              'Authorization': `Bearer ${token}`
                        }
                  });

                  const result = await response.json();
                  if (result.status === 200) {
                        setLevels(result.data);
                  }
            } catch (error) {
                  toast.error('Failed to fetch levels');
                  console.error('Error:', error);
            } finally {
                  setLoading(false);
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.name.trim()) {
                  toast.error('Level name is required');
                  return;
            }

            try {
                  const url = editingId
                        ? `${apiUrl}/admin/levels/${editingId}`
                        : `${apiUrl}/admin/levels`;

                  const method = editingId ? 'PUT' : 'POST';

                  const response = await fetch(url, {
                        method: method,
                        headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                  });

                  const result = await response.json();

                  if (result.status === 200 || result.status === 201) {
                        toast.success(result.message);
                        setFormData({ name: '' });
                        setEditingId(null);
                        setShowForm(false);
                        fetchLevels();
                  } else {
                        toast.error(result.errors?.name?.[0] || 'Failed to save level');
                  }
            } catch (error) {
                  toast.error('Error saving level');
                  console.error('Error:', error);
            }
      };

      const handleEdit = (level) => {
            setFormData({ name: level.name });
            setEditingId(level.id);
            setShowForm(true);
      };

      const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this level?')) {
                  try {
                        const response = await fetch(`${apiUrl}/admin/levels/${id}`, {
                              method: 'DELETE',
                              headers: {
                                    'Authorization': `Bearer ${token}`
                              }
                        });

                        const result = await response.json();
                        if (result.status === 200) {
                              toast.success(result.message);
                              fetchLevels();
                        }
                  } catch (error) {
                        toast.error('Failed to delete level');
                        console.error('Error:', error);
                  }
            }
      };

      const handleCancel = () => {
            setShowForm(false);
            setFormData({ name: '' });
            setEditingId(null);
      };

      useEffect(() => {
            fetchLevels();
      }, []);

      return (
            <div className="admin-section">
                  <div className="section-header">
                        <h2>Manage Levels</h2>
                        <button
                              className="btn btn-primary"
                              onClick={() => setShowForm(!showForm)}
                        >
                              {showForm ? 'Cancel' : 'Add New Level'}
                        </button>
                  </div>

                  {showForm && (
                        <form onSubmit={handleSubmit} className="admin-form">
                              <div className="form-group">
                                    <label>Level Name</label>
                                    <input
                                          type="text"
                                          className="form-control"
                                          value={formData.name}
                                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                          placeholder="Enter level name"
                                    />
                              </div>
                              <div className="form-actions">
                                    <button type="submit" className="btn btn-success">
                                          {editingId ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                          type="button"
                                          className="btn btn-secondary"
                                          onClick={handleCancel}
                                    >
                                          Cancel
                                    </button>
                              </div>
                        </form>
                  )}

                  {loading ? (
                        <p>Loading levels...</p>
                  ) : (
                        <table className="table table-striped">
                              <thead>
                                    <tr>
                                          <th>ID</th>
                                          <th>Name</th>
                                          <th>Created At</th>
                                          <th>Actions</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {levels.map(level => (
                                          <tr key={level.id}>
                                                <td>{level.id}</td>
                                                <td>{level.name}</td>
                                                <td>{new Date(level.created_at).toLocaleDateString()}</td>
                                                <td>
                                                      <button
                                                            className="btn btn-sm btn-warning me-2"
                                                            onClick={() => handleEdit(level)}
                                                      >
                                                            Edit
                                                      </button>
                                                      <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(level.id)}
                                                      >
                                                            Delete
                                                      </button>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  )}
            </div>
      );
}

export default AdminLevels;
