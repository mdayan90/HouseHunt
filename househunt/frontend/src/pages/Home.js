import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/properties').then(({ data }) => setFeaturedProperties(data.slice(0, 6))).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?search=${search}`);
  };

  const propertyTypes = [
    { name: 'All', icon: '🏘️' },
    { name: 'Apartment', icon: '🏢' },
    { name: 'House', icon: '🏠' },
    { name: 'Villa', icon: '🏡' },
    { name: 'Studio', icon: '🚪' },
    { name: 'Condo', icon: '🏙️' },
  ];

  const typeColors = {
    apartment: '#10b981', house: '#3b82f6',
    studio: '#f59e0b', villa: '#8b5cf6', condo: '#ef4444',
  };

  const filteredProperties = activeType === 'All'
    ? featuredProperties
    : featuredProperties.filter(p => p.type === activeType.toLowerCase());

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", background: '#f0f4f0' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #0a4a2f 0%, #1a7a4a 40%, #0d5c8a 100%)',
        minHeight: '88vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', fontSize: '180px', opacity: 0.1, transform: 'rotate(-20deg)', userSelect: 'none' }}>🍃</div>
        <div style={{ position: 'absolute', bottom: '-20px', left: '5%', fontSize: '140px', opacity: 0.08, transform: 'rotate(30deg)', userSelect: 'none' }}>🌿</div>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', top: '-100px', right: '20%' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '80px 20px' }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', padding: '6px 18px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ color: '#a7f3d0', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>🏆 #1 Rental Platform</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '12px', letterSpacing: '-1px' }}>Find Your</h1>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, background: 'linear-gradient(90deg, #6ee7b7, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>Dream Home</h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '40px', lineHeight: 1.7 }}>
                Browse thousands of verified rental properties — apartments, villas, studios and more.
              </p>

              <form onSubmit={handleSearch}>
                <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '8px', display: 'flex', gap: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxWidth: '580px' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: '12px', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🔍</span>
                    <input type="text" placeholder="Search city, property name..." value={search} onChange={e => setSearch(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent', color: '#1a1a1a', fontFamily: 'inherit' }} />
                  </div>
                  <button type="submit" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '12px', padding: '14px 28px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
                </div>
              </form>

              <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['New York', 'Los Angeles', 'Austin', 'Chicago', 'Miami'].map(city => (
                  <button key={city} onClick={() => navigate(`/properties?location=${city}`)} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>📍 {city}</button>
                ))}
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { number: '12,000+', label: 'Properties Listed', icon: '🏘️', color: '#6ee7b7' },
                  { number: '8,500+', label: 'Happy Tenants', icon: '😊', color: '#fbbf24' },
                  { number: '50+', label: 'Cities Covered', icon: '🌆', color: '#93c5fd' },
                  { number: '99%', label: 'Satisfaction Rate', icon: '⭐', color: '#f9a8d4' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.number}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '6px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPE TABS */}
      <section style={{ background: '#ffffff', padding: '40px 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {propertyTypes.map(type => (
              <button key={type.name} onClick={() => setActiveType(type.name)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 24px', borderRadius: '16px', border: '2px solid', borderColor: activeType === type.name ? '#10b981' : '#e5e7eb', background: activeType === type.name ? '#f0fdf4' : '#fafafa', cursor: 'pointer', minWidth: '90px', transition: 'all 0.2s', fontFamily: 'inherit' }}>
                <span style={{ fontSize: '28px' }}>{type.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: activeType === type.name ? '#059669' : '#6b7280' }}>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{ padding: '60px 0', background: '#f0f4f0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
            <div>
              <p style={{ color: '#10b981', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>FEATURED LISTINGS</p>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Popular Properties</h2>
            </div>
            <Link to="/properties" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>View All →</Link>
          </div>

          <div className="row g-3">
            {(filteredProperties.length > 0 ? filteredProperties : featuredProperties).map((property, i) => (
              <div key={property._id} className="col-md-6 col-lg-4">
                <Link to={`/properties/${property._id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'all 0.3s', cursor: 'pointer', border: '1px solid #e5e7eb' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                    <div style={{ height: '200px', background: `linear-gradient(135deg, ${['#0a4a2f','#1a3c5e','#4a1a5e','#5e1a1a','#1a4a4a','#4a3a1a'][i%6]} 0%, ${['#1a7a4a','#2563eb','#7c3aed','#dc2626','#0891b2','#d97706'][i%6]} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: '4rem' }}>
                      {['🏢','🏠','🏡','🚪','🏙️','🏬'][i%6]}
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, color: typeColors[property.type] || '#10b981', textTransform: 'capitalize' }}>{property.type}</div>
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: property.approved ? '#10b981' : '#f59e0b', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: 'white' }}>{property.approved ? '✓ Available' : '⏳ Pending'}</div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h5 style={{ fontWeight: 700, color: '#111827', marginBottom: '6px', fontSize: '16px' }}>{property.title}</h5>
                      <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '12px' }}>📍 {property.location}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {property.amenities.slice(0, 3).map((a, j) => (
                          <span key={j} style={{ background: '#f0fdf4', color: '#059669', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: 600 }}>{a}</span>
                        ))}
                        {property.amenities.length > 3 && <span style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '6px', padding: '3px 10px', fontSize: '11px' }}>+{property.amenities.length - 3}</span>}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>${property.price.toLocaleString()}</span>
                          <span style={{ color: '#9ca3af', fontSize: '13px' }}>/month</span>
                        </div>
                        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>View →</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ color: '#10b981', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>SIMPLE PROCESS</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>How HouseHunt Works</h2>
          </div>
          <div className="row g-4">
            {[
              { step: '01', icon: '🔍', title: 'Search Property', desc: 'Browse thousands of verified listings using our smart search and filter tools.' },
              { step: '02', icon: '📋', title: 'Choose & Book', desc: 'Pick your ideal property and submit a booking request in just a few clicks.' },
              { step: '03', icon: '🤝', title: 'Connect & Move In', desc: 'Get connected directly with the owner and move into your new home!' },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div style={{ textAlign: 'center', padding: '40px 30px', borderRadius: '24px', background: i === 1 ? 'linear-gradient(135deg, #0a4a2f, #1a7a4a)' : '#f9fafb', border: i === 1 ? 'none' : '1px solid #e5e7eb' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: i === 1 ? 'rgba(255,255,255,0.15)' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 20px' }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px', color: i === 1 ? 'rgba(255,255,255,0.5)' : '#10b981', marginBottom: '12px' }}>STEP {item.step}</div>
                  <h4 style={{ fontWeight: 800, color: i === 1 ? 'white' : '#111827', marginBottom: '12px' }}>{item.title}</h4>
                  <p style={{ color: i === 1 ? 'rgba(255,255,255,0.7)' : '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0a4a2f 0%, #1a7a4a 50%, #0d5c8a 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', fontSize: '200px', opacity: 0.06 }}>🍃</div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>Have a Property to Rent?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', marginBottom: '36px', maxWidth: '500px', margin: '0 auto 36px' }}>
            List your property for free and connect with thousands of verified tenants today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/add-property" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1a1a1a', padding: '16px 36px', borderRadius: '14px', textDecoration: 'none', fontWeight: 800, fontSize: '16px', boxShadow: '0 8px 30px rgba(251,191,36,0.4)' }}>🏠 List Your Property</Link>
            <Link to="/register" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: 'white', padding: '16px 36px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700, fontSize: '16px', border: '2px solid rgba(255,255,255,0.3)' }}>Get Started Free</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;