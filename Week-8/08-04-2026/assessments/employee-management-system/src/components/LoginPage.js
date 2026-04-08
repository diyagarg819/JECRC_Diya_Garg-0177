import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';
import { setLoading } from '../redux/slices/uiSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loginError } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(setLoading(true));

    // Simulate network delay for loading spinner demo
    await new Promise((resolve) => setTimeout(resolve, 1200));

    dispatch(login({ username, password }));
    dispatch(setLoading(false));
  };

  return (
    <div className="login-page" id="login-page">
      <div className="login-card fade-in">
        <div className="login-header">
          <div className="login-logo">👥</div>
          <h1>EmpManager</h1>
          <p>Sign in to your employee dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          {loginError && (
            <div className="login-error" id="login-error">
              <span>⚠</span>
              <span>{loginError}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login" id="btn-login">
            Sign In
          </button>
        </form>

        <div className="login-credentials">
          <h4>Demo Credentials</h4>
          <p><strong>admin</strong> / admin123</p>
          <p><strong>manager</strong> / manager123</p>
          <p><strong>hr</strong> / hr123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
