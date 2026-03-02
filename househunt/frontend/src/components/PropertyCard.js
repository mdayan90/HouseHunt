import React from 'react';
import { Link } from 'react-router-dom';

const typeColors = {
  apartment: 'primary',
  house: 'success',
  studio: 'info',
  villa: 'warning',
  condo: 'secondary'
};

const typeIcons = {
  apartment: 'building',
  house: 'house',
  studio: 'door-open',
  villa: 'houses',
  condo: 'building-fill'
};

const PropertyCard = ({ property }) => {
  const colorClass = typeColors[property.type] || 'secondary';
  const icon = typeIcons[property.type] || 'building';

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card property-card h-100">
        <div className="property-img-placeholder">
          <i className={`bi bi-${icon}`}></i>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`badge bg-${colorClass} type-badge`}>{property.type}</span>
            {!property.approved && <span className="badge bg-warning text-dark">Pending</span>}
          </div>
          <h5 className="card-title">{property.title}</h5>
          <p className="text-muted small mb-1">
            <i className="bi bi-geo-alt me-1"></i>{property.location}
          </p>
          <p className="card-text text-muted small flex-grow-1">
            {property.description.length > 100 ? property.description.substring(0, 100) + '...' : property.description}
          </p>
          <div className="mb-2">
            {property.amenities.slice(0, 3).map((a, i) => (
              <span key={i} className="amenity-badge">{a}</span>
            ))}
            {property.amenities.length > 3 && (
              <span className="amenity-badge">+{property.amenities.length - 3} more</span>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="price-badge">${property.price.toLocaleString()}<small className="text-muted fw-normal">/mo</small></span>
            <Link to={`/properties/${property._id}`} className="btn btn-outline-primary btn-sm">
              View Details <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
