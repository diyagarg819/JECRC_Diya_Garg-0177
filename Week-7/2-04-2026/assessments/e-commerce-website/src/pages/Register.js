import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login({ email: formData.email, name: formData.name });
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Create Account</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Join the enterprise network</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Full Name</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} 
            placeholder="John Doe" 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Email Address</label>
          <input 
            type="email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} 
            placeholder="john@example.com" 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Password</label>
          <input 
            type="password" 
            required 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} 
            placeholder="••••••••" 
          />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Create Account</button>
      </form>
      
      <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log In</Link>
      </p>
      <div style={{ marginTop: '16px' }}>
        <Link to="/" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>← Back to Home</Link>
      </div>
    </div>
  );
};

export default Register;
