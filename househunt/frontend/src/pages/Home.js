import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/properties').then(({ data }) => setFeaturedProperties(data.slice(0, 3))).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?search=${search}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="mb-3">Find Your Perfect <span style={{ color: '#ffd700' }}>Home</span></h1>
          <p className="lead mb-4">Browse thousands of rental properties across the country</p>
          <form onSubmit={handleSearch} className="row justify-content-center g-2">
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title, location..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-warning" type="submit">
                  <i className="bi bi-search me-1"></i>Search
                </button>
              </div>
            </div>
          </form>
          <div className="mt-4 d-flex justify-content-center gap-4">
            <div className="text-center">
              <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>500+</h3>
              <small>Properties</small>
            </div>
            <div className="text-center">
              <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>1200+</h3>
              <small>Happy Tenants</small>
            </div>
            <div className="text-center">
              <h3 className="fw-bold mb-0" style={{ color: '#ffd700' }}>50+</h3>
              <small>Cities</small>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Browse by Type</h2>
          <div className="row g-3 justify-content-center">
            {[
              { type: 'apartment', icon: 'building', label: 'Apartments', color: 'primary' },
              { type: 'house', icon: 'house', label: 'Houses', color: 'success' },
              { type: 'studio', icon: 'door-open', label: 'Studios', color: 'info' },
              { type: 'villa', icon: 'houses', label: 'Villas', color: 'warning' },
              { type: 'condo', icon: 'building-fill', label: 'Condos', color: 'secondary' }
            ].map(({ type, icon, label, color }) => (
              <div key={type} className="col-6 col-md-2">
                <Link to={`/properties?type=${type}`} className="text-decoration-none">
                  <div className={`card text-center py-3 border-${color} h-100`} style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <i className={`bi bi-${icon} text-${color}`} style={{ fontSize: '2rem' }}></i>
                    <p className="mb-0 mt-2 small fw-semibold">{label}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Featured Properties</h2>
            <Link to="/properties" className="btn btn-outline-primary">View All <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="row">
            {featuredProperties.map(p => <PropertyCard key={p._id} property={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1a3c5e, #2563eb)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Have a Property to Rent?</h2>
          <p className="lead mb-4">List your property with us and reach thousands of potential tenants</p>
          <Link to="/add-property" className="btn btn-warning btn-lg me-3">
            <i className="bi bi-plus-circle me-2"></i>List Your Property
          </Link>
          <Link to="/register" className="btn btn-outline-light btn-lg">
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
