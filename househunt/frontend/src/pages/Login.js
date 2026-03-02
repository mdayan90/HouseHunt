import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card auth-card p-4">
              <div className="text-center mb-4">
                <i className="bi bi-house-heart-fill text-primary" style={{ fontSize: '3rem' }}></i>
                <h3 className="fw-bold mt-2">Welcome Back</h3>
                <p className="text-muted">Sign in to your HouseHunt account</p>
              </div>
              {error && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2" /> : <i className="bi bi-box-arrow-in-right me-2"></i>}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="mb-2 small text-muted">Don't have an account? <Link to="/register" className="fw-semibold">Register here</Link></p>
                <hr />
                <p className="small text-muted mb-1"><strong>Demo Credentials:</strong></p>
                <p className="small text-muted mb-0">Admin: admin@househunt.com / admin123</p>
                <p className="small text-muted">User: john@example.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
