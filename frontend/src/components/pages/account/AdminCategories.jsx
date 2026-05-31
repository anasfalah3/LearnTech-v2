import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiUrl, token } from '../../common/Config';

function AdminCategories() {
      const [categories, setCategories] = useState([]);
      const [loading, setLoading] = useState(false);
      const [showForm, setShowForm] = useState(false);
      const [formData, setFormData] = useState({ name: '' });
      const [editingId, setEditingId] = useState(null);

      const fetchCategories = async () => {
            setLoading(true);
            try {
                  const response = await fetch(`${apiUrl}/admin/categories`, {
                        headers: {
                              'Authorization': `Bearer ${token}`
                        }
                  });

                  const result = await response.json();
                  if (result.status === 200) {
                        setCategories(result.data);
                  }
            } catch (error) {
                  toast.error('Failed to fetch categories');
                  console.error('Error:', error);
            } finally {
                  setLoading(false);
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.name.trim()) {
                  toast.error('Category name is required');
                  return;
            }

            try {
                  const url = editingId
                        ? `${apiUrl}/admin/categories/${editingId}`
                        : `${apiUrl}/admin/categories`;

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
                        fetchCategories();
                  } else {
                        toast.error(result.errors?.name?.[0] || 'Failed to save category');
                  }
            } catch (error) {
                  toast.error('Error saving category');
                  console.error('Error:', error);
            }
      };

      const handleEdit = (category) => {
            setFormData({ name: category.name });
            setEditingId(category.id);
            setShowForm(true);
      };

      const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this category?')) {
                  try {
                        const response = await fetch(`${apiUrl}/admin/categories/${id}`, {
                              method: 'DELETE',
                              headers: {
                                    'Authorization': `Bearer ${token}`
                              }
                        });

                        const result = await response.json();
                        if (result.status === 200) {
                              toast.success(result.message);
                              fetchCategories();
                        }
                  } catch (error) {
                        toast.error('Failed to delete category');
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
            fetchCategories();
      }, []);

      return (
            <div className="admin-section">
                  <div className="section-header">
                        <h2>Manage Categories</h2>
                        <button
                              className="btn btn-primary"
                              onClick={() => setShowForm(!showForm)}
                        >
                              {showForm ? 'Cancel' : 'Add New Category'}
                        </button>
                  </div>

                  {showForm && (
                        <form onSubmit={handleSubmit} className="admin-form">
                              <div className="form-group">
                                    <label>Category Name</label>
                                    <input
                                          type="text"
                                          className="form-control"
                                          value={formData.name}
                                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                          placeholder="Enter category name"
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
                        <p>Loading categories...</p>
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
                                    {categories.map(category => (
                                          <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>{new Date(category.created_at).toLocaleDateString()}</td>
                                                <td>
                                                      <button
                                                            className="btn btn-sm btn-warning me-2"
                                                            onClick={() => handleEdit(category)}
                                                      >
                                                            Edit
                                                      </button>
                                                      <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(category.id)}
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

export default AdminCategories;
