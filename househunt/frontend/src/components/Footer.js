import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-white fw-bold"><i className="bi bi-house-heart-fill me-2"></i>HouseHunt</h5>
            <p className="small">Find your perfect rental home with ease. Browse thousands of properties across the country.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="text-white">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Browse Properties</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="text-white">Contact</h6>
            <p className="small">
              <i className="bi bi-envelope me-2"></i>info@househunt.com<br />
              <i className="bi bi-telephone me-2"></i>+1 (555) 123-4567<br />
              <i className="bi bi-geo-alt me-2"></i>123 Main St, New York, NY
            </p>
          </div>
        </div>
        <hr style={{ borderColor: '#334155' }} />
        <p className="text-center small mb-0">&copy; {new Date().getFullYear()} HouseHunt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
