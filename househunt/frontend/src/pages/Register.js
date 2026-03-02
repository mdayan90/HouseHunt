import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
                <i className="bi bi-person-plus-fill text-primary" style={{ fontSize: '3rem' }}></i>
                <h3 className="fw-bold mt-2">Create Account</h3>
                <p className="text-muted">Join HouseHunt today</p>
              </div>
              {error && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input type="text" className="form-control" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input type="email" className="form-control" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input type="password" className="form-control" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required minLength={6} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input type="password" className="form-control" name="confirmPassword" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2" /> : <i className="bi bi-person-check me-2"></i>}
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="small text-muted">Already have an account? <Link to="/login" className="fw-semibold">Sign in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
