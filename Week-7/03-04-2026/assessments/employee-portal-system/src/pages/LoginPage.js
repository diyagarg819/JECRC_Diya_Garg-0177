import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Alert, Spinner } from '../components/ui';

const QUICK_LOGINS = [
  { label: 'Admin',    role: 'HR Director',    username: 'admin',  password: 'admin123' },
  { label: 'Employee', role: 'Senior Dev',      username: 'john',   password: 'john123'  },
  { label: 'Employee', role: 'UX Lead',         username: 'priya',  password: 'priya123' },
  { label: 'Employee', role: 'Brand Manager',   username: 'marcus', password: 'marcus123'},
];

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [errors, setErrors]         = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading]       = useState(false);

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = 'Username is required';
    if (!password.trim()) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setGlobalError('');
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setGlobalError('Invalid username or password. Use the quick-login cards below to try demo accounts.');
        setLoading(false);
      }
      // On success the AuthContext updates user → AppRouter renders AppLayout
    }, 700);
  };

  const fillQuick = (u, p) => {
    setUsername(u);
    setPassword(p);
    setErrors({});
    setGlobalError('');
  };

  return (
    <div className="login-page">
      <div className="login-bg" />

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">🏢</div>
          <h1 className="login-title">CorpPortal</h1>
          <p className="login-subtitle">Internal Employee Management System</p>
        </div>

        {/* Error */}
        {globalError && (
          <Alert type="error" message={globalError} onClose={() => setGlobalError('')} />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className={`form-input${errors.username ? ' error' : ''}`}
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: '' })); }}
              placeholder="Enter your username"
              autoComplete="username"
              autoFocus
            />
            {errors.username && (
              <p className="form-error"><span>⚠</span> {errors.username}</p>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Password</label>
            <input
              className={`form-input${errors.password ? ' error' : ''}`}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="form-error"><span>⚠</span> {errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={loading}
          >
            {loading ? <><Spinner size={16} /> Signing in…</> : 'Sign In →'}
          </button>
        </form>

        {/* Quick login */}
        <hr className="login-divider" />
        <p className="quick-login-label">Demo Accounts</p>
        <div className="quick-login-grid" style={{ flexWrap: 'wrap' }}>
          {QUICK_LOGINS.map((q) => (
            <button
              key={q.username}
              className="quick-login-btn"
              onClick={() => fillQuick(q.username, q.password)}
            >
              <div className="quick-login-btn-label">{q.label}</div>
              <div className="quick-login-btn-sub">{q.username}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
