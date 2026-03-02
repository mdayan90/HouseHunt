import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/users').then(({ data }) => { setUsers(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (id === currentUser._id) return alert("You can't delete yourself!");
    if (!window.confirm('Delete this user?')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <div className="loading-container"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1"><i className="bi bi-people me-2 text-primary"></i>Manage Users</h2>
      <p className="text-muted mb-4">{users.length} registered users</p>
      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td className="fw-semibold">
                  {u.name}
                  {u._id === currentUser._id && <span className="badge bg-info ms-2">You</span>}
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'} text-capitalize`}>
                    {u.role === 'admin' ? <i className="bi bi-shield-fill me-1"></i> : <i className="bi bi-person me-1"></i>}
                    {u.role}
                  </span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u._id !== currentUser._id && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
