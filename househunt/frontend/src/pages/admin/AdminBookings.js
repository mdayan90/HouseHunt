import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/bookings').then(({ data }) => { setBookings(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const statusBadge = (status) => {
    const map = { pending: 'warning text-dark', confirmed: 'success', cancelled: 'danger' };
    return <span className={`badge bg-${map[status] || 'secondary'} text-capitalize`}>{status}</span>;
  };

  if (loading) return <div className="loading-container"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1"><i className="bi bi-calendar-check me-2 text-primary"></i>All Bookings</h2>
      <p className="text-muted mb-4">{bookings.length} total bookings</p>
      <div className="row g-3 mb-4">
        {[
          { label: 'Total', count: bookings.length, color: 'primary' },
          { label: 'Pending', count: bookings.filter(b => b.status === 'pending').length, color: 'warning' },
          { label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length, color: 'success' },
          { label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length, color: 'danger' }
        ].map(({ label, count, color }) => (
          <div key={label} className="col-6 col-md-3">
            <div className={`card border-${color} text-center py-3`}>
              <h4 className={`text-${color} fw-bold mb-0`}>{count}</h4>
              <small className="text-muted">{label}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Property</th>
              <th>Location</th>
              <th>Price</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-4 text-muted">No bookings found</td></tr>
            ) : bookings.map(b => (
              <tr key={b._id}>
                <td>
                  <strong>{b.user?.name}</strong><br />
                  <small className="text-muted">{b.user?.email}</small>
                </td>
                <td><Link to={`/properties/${b.property?._id}`} className="fw-semibold text-decoration-none">{b.property?.title}</Link></td>
                <td>{b.property?.location}</td>
                <td>${b.property?.price?.toLocaleString()}/mo</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>{statusBadge(b.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
