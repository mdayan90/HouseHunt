import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: '',
    type: searchParams.get('type') || '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProperties = async (f) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.search) params.append('search', f.search);
      if (f.location) params.append('location', f.location);
      if (f.type) params.append('type', f.type);
      if (f.minPrice) params.append('minPrice', f.minPrice);
      if (f.maxPrice) params.append('maxPrice', f.maxPrice);
      const { data } = await API.get(`/properties?${params}`);
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(filters); }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProperties(filters);
  };

  const handleReset = () => {
    const reset = { search: '', location: '', type: '', minPrice: '', maxPrice: '' };
    setFilters(reset);
    fetchProperties(reset);
  };

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <h2 className="fw-bold mb-4"><i className="bi bi-building me-2"></i>Browse Properties</h2>
        <div className="row">
          {/* Filter Panel */}
          <div className="col-lg-3 mb-4">
            <div className="filter-panel">
              <h5 className="fw-bold mb-3"><i className="bi bi-funnel me-2"></i>Filters</h5>
              <form onSubmit={handleFilter}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Search</label>
                  <input type="text" className="form-control form-control-sm" name="search" placeholder="Search title..." value={filters.search} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Location</label>
                  <input type="text" className="form-control form-control-sm" name="location" placeholder="City, State..." value={filters.location} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Property Type</label>
                  <select className="form-select form-select-sm" name="type" value={filters.type} onChange={handleChange}>
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="studio">Studio</option>
                    <option value="villa">Villa</option>
                    <option value="condo">Condo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Price Range</label>
                  <div className="row g-1">
                    <div className="col-6">
                      <input type="number" className="form-control form-control-sm" name="minPrice" placeholder="Min $" value={filters.minPrice} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                      <input type="number" className="form-control form-control-sm" name="maxPrice" placeholder="Max $" value={filters.maxPrice} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-sm"><i className="bi bi-search me-1"></i>Apply Filters</button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleReset}><i className="bi bi-x-circle me-1"></i>Reset</button>
                </div>
              </form>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0"><strong>{properties.length}</strong> properties found</p>
            </div>
            {loading ? (
              <div className="loading-container"><div className="spinner-border text-primary" /></div>
            ) : properties.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-building-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                <p className="mt-3 text-muted">No properties found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="row">
                {properties.map(p => <PropertyCard key={p._id} property={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
