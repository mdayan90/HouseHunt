import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a3c5e' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-house-heart-fill me-2"></i>House<span>Hunt</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"><i className="bi bi-house me-1"></i>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/properties"><i className="bi bi-building me-1"></i>Properties</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i>Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-property">
                    <i className="bi bi-plus-circle me-1"></i>List Property
                  </Link>
                </li>
                {user.role === 'admin' && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="bi bi-shield-check me-1"></i>Admin
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><Link className="dropdown-item" to="/admin"><i className="bi bi-grid me-2"></i>Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/admin/properties"><i className="bi bi-building me-2"></i>Properties</Link></li>
                      <li><Link className="dropdown-item" to="/admin/users"><i className="bi bi-people me-2"></i>Users</Link></li>
                      <li><Link className="dropdown-item" to="/admin/bookings"><i className="bi bi-calendar-check me-2"></i>Bookings</Link></li>
                    </ul>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle me-1"></i>{user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><i className="bi bi-box-arrow-in-right me-1"></i>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm ms-2 mt-1" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
