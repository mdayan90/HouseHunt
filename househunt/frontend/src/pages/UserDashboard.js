import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, bookRes] = await Promise.all([
          API.get('/properties/my'),
          API.get('/bookings/my')
        ]);
        setMyProperties(propRes.data);
        setMyBookings(bookRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      setMyBookings(myBookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel');
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await API.delete(`/properties/${id}`);
      setMyProperties(myProperties.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const statusBadge = (status) => {
    const map = { pending: 'warning', confirmed: 'success', cancelled: 'danger' };
    return <span className={`badge bg-${map[status] || 'secondary'} text-capitalize`}>{status}</span>;
  };

  if (loading) return <div className="loading-container"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h2 className="fw-bold"><i className="bi bi-speedometer2 me-2"></i>My Dashboard</h2>
          <p className="text-muted">Welcome back, <strong>{user?.name}</strong>!</p>
        </div>
        <div className="col-auto">
          <Link to="/add-property" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>List Property
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">My Properties</p>
                <div className="stat-number">{myProperties.length}</div>
              </div>
              <i className="bi bi-building opacity-50" style={{ fontSize: '3rem' }}></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card bg-success text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Total Bookings</p>
                <div className="stat-number">{myBookings.length}</div>
              </div>
              <i className="bi bi-calendar-check opacity-50" style={{ fontSize: '3rem' }}></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card bg-info text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Active Bookings</p>
                <div className="stat-number">{myBookings.filter(b => b.status === 'confirmed').length}</div>
              </div>
              <i className="bi bi-check-circle opacity-50" style={{ fontSize: '3rem' }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <i className="bi bi-calendar-check me-1"></i>My Bookings ({myBookings.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>
            <i className="bi bi-building me-1"></i>My Properties ({myProperties.length})
          </button>
        </li>
      </ul>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
          {myBookings.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <p className="mt-3 text-muted">No bookings yet. <Link to="/properties">Browse properties</Link> to make a booking.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover admin-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myBookings.map(b => (
                    <tr key={b._id}>
                      <td><Link to={`/properties/${b.property?._id}`} className="text-decoration-none fw-semibold">{b.property?.title}</Link></td>
                      <td><i className="bi bi-geo-alt me-1 text-muted"></i>{b.property?.location}</td>
                      <td>${b.property?.price?.toLocaleString()}/mo</td>
                      <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                      <td>{statusBadge(b.status)}</td>
                      <td>
                        {b.status === 'pending' && (
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleCancelBooking(b._id)}>
                            <i className="bi bi-x-circle me-1"></i>Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <div>
          {myProperties.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-building-add" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <p className="mt-3 text-muted">You haven't listed any properties yet.</p>
              <Link to="/add-property" className="btn btn-primary">List a Property</Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myProperties.map(p => (
                    <tr key={p._id}>
                      <td className="fw-semibold">{p.title}</td>
                      <td><span className="badge bg-secondary text-capitalize">{p.type}</span></td>
                      <td>{p.location}</td>
                      <td>${p.price.toLocaleString()}/mo</td>
                      <td>
                        {p.approved
                          ? <span className="badge bg-success"><span className="approved-indicator"></span>Approved</span>
                          : <span className="badge bg-warning text-dark"><span className="pending-indicator"></span>Pending</span>}
                      </td>
                      <td className="d-flex gap-1">
                        <Link to={`/properties/${p._id}`} className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-eye"></i>
                        </Link>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProperty(p._id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
