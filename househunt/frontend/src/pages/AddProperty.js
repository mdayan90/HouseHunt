import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const amenitiesOptions = ['WiFi', 'Parking', 'Gym', 'Pool', 'Laundry', 'AC', 'Heating', 'Garden', 'Security', 'Pet Friendly', 'Concierge', 'Smart Home'];

const AddProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', location: '', price: '', type: '', amenities: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAmenity = (amenity) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/properties', form);
      setSuccess('Property submitted successfully! It will be visible after admin approval.');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-1"><i className="bi bi-plus-circle me-2 text-primary"></i>List a Property</h2>
              <p className="text-muted mb-4">Fill in the details below. Your property will be reviewed before going live.</p>
              
              {success && <div className="alert alert-success"><i className="bi bi-check-circle me-2"></i>{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Property Title *</label>
                    <input type="text" className="form-control" name="title" placeholder="e.g. Modern Downtown Apartment" value={form.title} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Property Type *</label>
                    <select className="form-select" name="type" value={form.type} onChange={handleChange} required>
                      <option value="">Select Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="studio">Studio</option>
                      <option value="villa">Villa</option>
                      <option value="condo">Condo</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Monthly Rent (USD) *</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" name="price" placeholder="2000" value={form.price} onChange={handleChange} required min={1} />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Location *</label>
                    <input type="text" className="form-control" name="location" placeholder="e.g. New York, NY" value={form.location} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description *</label>
                    <textarea className="form-control" name="description" rows={4} placeholder="Describe your property in detail..." value={form.description} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Amenities</label>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {amenitiesOptions.map(a => (
                        <div key={a}>
                          <input type="checkbox" className="btn-check" id={`am-${a}`} checked={form.amenities.includes(a)} onChange={() => handleAmenity(a)} />
                          <label className="btn btn-outline-primary btn-sm" htmlFor={`am-${a}`}>{a}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="alert alert-info py-2 small">
                      <i className="bi bi-info-circle me-2"></i>
                      Your property will be reviewed by our admin team before it appears on the site.
                    </div>
                  </div>
                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                      {loading ? <span className="spinner-border spinner-border-sm me-2" /> : <i className="bi bi-send me-2"></i>}
                      {loading ? 'Submitting...' : 'Submit Property'}
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
