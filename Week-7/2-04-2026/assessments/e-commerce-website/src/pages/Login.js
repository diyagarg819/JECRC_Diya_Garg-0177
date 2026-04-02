import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ email });
      navigate(from, { replace: true });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Welcome Back</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Please enter your details</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} 
            placeholder="admin@enterprise.com" 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} 
            placeholder="••••••••" 
          />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Log In</button>
      </form>
      
      <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign Up</Link>
      </p>
      <div style={{ marginTop: '16px' }}>
        <Link to="/" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>← Back to Home</Link>
      </div>
    </div>
  );
};

export default Login;
