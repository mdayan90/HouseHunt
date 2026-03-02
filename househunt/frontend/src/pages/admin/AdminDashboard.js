import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/stats').then(({ data }) => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: 'people', color: 'primary', link: '/admin/users' },
    { label: 'Total Properties', value: stats.totalProperties, icon: 'building', color: 'success', link: '/admin/properties' },
    { label: 'Pending Approval', value: stats.pendingProperties, icon: 'hourglass-split', color: 'warning', link: '/admin/properties' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: 'calendar-check', color: 'info', link: '/admin/bookings' }
  ];

  if (loading) return <div className="loading-container"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1"><i className="bi bi-shield-check me-2 text-primary"></i>Admin Dashboard</h2>
      <p className="text-muted mb-4">Manage your platform from here</p>

      <div className="row g-3 mb-4">
        {statCards.map(({ label, value, icon, color, link }) => (
          <div key={label} className="col-6 col-md-3">
            <Link to={link} className="text-decoration-none">
              <div className={`stat-card bg-${color} text-white h-100`} style={{ cursor: 'pointer' }}>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="mb-1 opacity-75 small">{label}</p>
                    <div className="stat-number">{value ?? '...'}</div>
                  </div>
                  <i className={`bi bi-${icon} opacity-50`} style={{ fontSize: '2.5rem' }}></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {[
          { to: '/admin/properties', icon: 'building', label: 'Manage Properties', desc: 'Approve, view, and delete property listings', color: 'primary' },
          { to: '/admin/users', icon: 'people', label: 'Manage Users', desc: 'View and manage registered users', color: 'success' },
          { to: '/admin/bookings', icon: 'calendar-check', label: 'View Bookings', desc: 'Monitor all property bookings', color: 'info' }
        ].map(({ to, icon, label, desc, color }) => (
          <div key={to} className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <i className={`bi bi-${icon} text-${color} mb-3`} style={{ fontSize: '2rem' }}></i>
                <h5 className="fw-bold">{label}</h5>
                <p className="text-muted small">{desc}</p>
                <Link to={to} className={`btn btn-${color} btn-sm`}>Go to {label.split(' ')[1]} <i className="bi bi-arrow-right ms-1"></i></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
