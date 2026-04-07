import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiUser, FiLock, FiEye, FiEyeOff, FiSun, FiMoon } from 'react-icons/fi';
import './Login.css';

export default function Login() {
  const { login, error, clearError } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      login(username, password);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login">
      {/* Theme toggle */}
      <button className="login__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDark ? <FiSun /> : <FiMoon />}
      </button>

      {/* Animated background */}
      <div className="login__bg">
        <div className="login__bg-orb login__bg-orb--1" />
        <div className="login__bg-orb login__bg-orb--2" />
        <div className="login__bg-orb login__bg-orb--3" />
      </div>

      {/* Left panel */}
      <div className="login__left">
        <div className="login__brand">
          <div className="login__brand-icon">EP</div>
          <h1 className="login__brand-title">Employee Portal</h1>
          <p className="login__brand-subtitle">
            Your centralized hub for managing employee records, analytics, and team collaboration.
          </p>
        </div>
        <div className="login__features">
          <div className="login__feature">
            <div className="login__feature-dot" />
            <span>Manage employee records effortlessly</span>
          </div>
          <div className="login__feature">
            <div className="login__feature-dot" />
            <span>Real-time analytics dashboard</span>
          </div>
          <div className="login__feature">
            <div className="login__feature-dot" />
            <span>Customizable themes & settings</span>
          </div>
        </div>
      </div>

      {/* Right panel (form) */}
      <div className="login__right">
        <div className="login__card">
          <div className="login__card-header">
            <h2 className="login__card-title">Welcome Back</h2>
            <p className="login__card-subtitle">Sign in to continue to your portal</p>
          </div>

          <form className="login__form" onSubmit={handleSubmit}>
            {error && (
              <div className="login__error" onClick={clearError}>
                <span>⚠️ {error}</span>
                <span className="login__error-close">×</span>
              </div>
            )}

            <div className="login__field">
              <label className="login__label" htmlFor="login-username">Username</label>
              <div className="login__input-wrapper">
                <FiUser className="login__input-icon" />
                <input
                  id="login-username"
                  type="text"
                  className="login__input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="login-password">Password</label>
              <div className="login__input-wrapper">
                <FiLock className="login__input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login__input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login__input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`login__submit ${isLoading ? 'login__submit--loading' : ''}`}
              disabled={isLoading}
              id="login-submit"
            >
              {isLoading ? (
                <div className="login__spinner" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login__demo">
            <p className="login__demo-title">Demo Credentials</p>
            <div className="login__demo-cards">
              <button className="login__demo-card" onClick={() => { setUsername('admin'); setPassword('admin123'); }}>
                <span className="login__demo-role">Admin</span>
                <span className="login__demo-cred">admin / admin123</span>
              </button>
              <button className="login__demo-card" onClick={() => { setUsername('manager'); setPassword('mgr123'); }}>
                <span className="login__demo-role">Manager</span>
                <span className="login__demo-cred">manager / mgr123</span>
              </button>
              <button className="login__demo-card" onClick={() => { setUsername('employee'); setPassword('emp123'); }}>
                <span className="login__demo-role">Employee</span>
                <span className="login__demo-cred">employee / emp123</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
