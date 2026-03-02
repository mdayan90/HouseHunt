import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const typeColors = { apartment: 'primary', house: 'success', studio: 'info', villa: 'warning', condo: 'secondary' };

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    API.get(`/properties/${id}`)
      .then(({ data }) => { setProperty(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    setBookingLoading(true);
    setBookingError('');
    try {
      await API.post('/bookings', { propertyId: id, bookingDate, message });
      setBookingSuccess('Booking submitted successfully! The owner will contact you soon.');
      setBookingDate('');
      setMessage('');
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="loading-container"><div className="spinner-border text-primary" /></div>;
  if (!property) return <div className="container py-5 text-center"><h4>Property not found</h4></div>;

  const colorClass = typeColors[property.type] || 'secondary';

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          {/* Property Image */}
          <div className="property-img-placeholder mb-4 rounded-3" style={{ height: '350px', fontSize: '5rem' }}>
            <i className="bi bi-building"></i>
          </div>

          {/* Title */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span className={`badge bg-${colorClass} me-2 text-capitalize`}>{property.type}</span>
              {property.approved ? <span className="badge bg-success">Available</span> : <span className="badge bg-warning text-dark">Pending Approval</span>}
              <h2 className="fw-bold mt-2">{property.title}</h2>
              <p className="text-muted"><i className="bi bi-geo-alt me-1"></i>{property.location}</p>
            </div>
            <div className="text-end">
              <h3 className="price-badge">${property.price.toLocaleString()}</h3>
              <small className="text-muted">per month</small>
            </div>
          </div>

          {/* Description */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold"><i className="bi bi-info-circle me-2"></i>Description</h5>
              <p>{property.description}</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3"><i className="bi bi-check-circle me-2"></i>Amenities</h5>
              <div className="row">
                {property.amenities.map((a, i) => (
                  <div key={i} className="col-6 col-md-4 mb-2">
                    <span><i className="bi bi-check-circle-fill text-success me-2"></i>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Owner Info */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold"><i className="bi bi-person-badge me-2"></i>Listed By</h5>
              <p className="mb-1"><strong>{property.owner?.name}</strong></p>
              <p className="text-muted small">{property.owner?.email}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '80px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3"><i className="bi bi-calendar-check me-2"></i>Book This Property</h5>
              {bookingSuccess && <div className="alert alert-success"><i className="bi bi-check-circle me-2"></i>{bookingSuccess}</div>}
              {bookingError && <div className="alert alert-danger">{bookingError}</div>}
              {!property.approved ? (
                <div className="alert alert-warning"><i className="bi bi-exclamation-triangle me-2"></i>This property is pending approval and cannot be booked yet.</div>
              ) : (
                <form onSubmit={handleBooking}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Preferred Move-in Date</label>
                    <input type="date" className="form-control" value={bookingDate} onChange={e => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Message to Owner (Optional)</label>
                    <textarea className="form-control" rows={3} placeholder="Tell the owner about yourself..." value={message} onChange={e => setMessage(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={bookingLoading}>
                    {bookingLoading ? <span className="spinner-border spinner-border-sm me-2" /> : <i className="bi bi-calendar-plus me-2"></i>}
                    {user ? (bookingLoading ? 'Booking...' : 'Book Now') : 'Login to Book'}
                  </button>
                </form>
              )}
              <div className="mt-3 p-3 bg-light rounded">
                <p className="small text-muted mb-1"><i className="bi bi-shield-check text-success me-2"></i>Secure booking process</p>
                <p className="small text-muted mb-0"><i className="bi bi-chat-dots text-primary me-2"></i>Direct communication with owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
