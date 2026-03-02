import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    API.get('/admin/properties').then(({ data }) => { setProperties(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/admin/properties/${id}/approve`);
      setProperties(properties.map(p => p._id === id ? { ...p, approved: true } : p));
    } catch (err) {
      alert('Failed to approve');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property permanently?')) return;
    try {
      await API.delete(`/admin/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const filtered = filter === 'all' ? properties : filter === 'pending' ? properties.filter(p => !p.approved) : properties.filter(p => p.approved);

  if (loading) return <div className="loading-container"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1"><i className="bi bi-building me-2 text-primary"></i>Manage Properties</h2>
      <p className="text-muted mb-4">{properties.length} total properties</p>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'approved'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)} {f === 'pending' ? `(${properties.filter(p => !p.approved).length})` : f === 'approved' ? `(${properties.filter(p => p.approved).length})` : `(${properties.length})`}
          </button>
        ))}
      </div>

      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Price</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-4 text-muted">No properties found</td></tr>
            ) : filtered.map(p => (
              <tr key={p._id}>
                <td><Link to={`/properties/${p._id}`} className="fw-semibold text-decoration-none">{p.title}</Link></td>
                <td><span className="badge bg-secondary text-capitalize">{p.type}</span></td>
                <td>{p.location}</td>
                <td>${p.price.toLocaleString()}</td>
                <td>
                  <small>
                    <strong>{p.owner?.name}</strong><br />
                    <span className="text-muted">{p.owner?.email}</span>
                  </small>
                </td>
                <td>
                  {p.approved
                    ? <span className="badge bg-success">Approved</span>
                    : <span className="badge bg-warning text-dark">Pending</span>}
                </td>
                <td>
                  <div className="d-flex gap-1">
                    {!p.approved && (
                      <button className="btn btn-success btn-sm" onClick={() => handleApprove(p._id)} title="Approve">
                        <i className="bi bi-check-lg"></i>
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)} title="Delete">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProperties;
