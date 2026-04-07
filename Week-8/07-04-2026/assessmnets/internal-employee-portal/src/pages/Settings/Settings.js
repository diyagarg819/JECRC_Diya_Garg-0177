import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiUser, FiMoon, FiSun, FiBell, FiShield, FiGlobe, FiCheck } from 'react-icons/fi';
import './Settings.css';

export default function Settings() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    reports: true,
  });

  const [saved, setSaved] = useState(false);

  const handleNotifChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings fade-in">
      <div className="settings__header">
        <h2 className="settings__title">Settings</h2>
        <p className="settings__subtitle">Manage your account preferences</p>
      </div>

      {/* Profile Section */}
      <div className="settings__section">
        <div className="settings__section-header">
          <FiUser className="settings__section-icon" />
          <div>
            <h3 className="settings__section-title">Profile Information</h3>
            <p className="settings__section-desc">Your personal details and account info</p>
          </div>
        </div>
        <div className="settings__card">
          <div className="settings__profile">
            <div className="settings__profile-avatar">{user?.avatar}</div>
            <div className="settings__profile-info">
              <h4 className="settings__profile-name">{user?.name}</h4>
              <p className="settings__profile-role">{user?.role} — {user?.department}</p>
              <p className="settings__profile-id">Employee ID: EMP-{String(user?.id).padStart(4, '0')}</p>
            </div>
          </div>
          <div className="settings__form-grid">
            <div className="settings__form-field">
              <label className="settings__form-label">Full Name</label>
              <input type="text" className="settings__form-input" value={user?.name || ''} readOnly />
            </div>
            <div className="settings__form-field">
              <label className="settings__form-label">Role</label>
              <input type="text" className="settings__form-input" value={user?.role || ''} readOnly />
            </div>
            <div className="settings__form-field">
              <label className="settings__form-label">Department</label>
              <input type="text" className="settings__form-input" value={user?.department || ''} readOnly />
            </div>
            <div className="settings__form-field">
              <label className="settings__form-label">Username</label>
              <input type="text" className="settings__form-input" value={user?.username || ''} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="settings__section">
        <div className="settings__section-header">
          {isDark ? <FiMoon className="settings__section-icon" /> : <FiSun className="settings__section-icon" />}
          <div>
            <h3 className="settings__section-title">Appearance</h3>
            <p className="settings__section-desc">Customize how the portal looks</p>
          </div>
        </div>
        <div className="settings__card">
          <div className="settings__toggle-row">
            <div className="settings__toggle-info">
              <span className="settings__toggle-label">Dark Mode</span>
              <span className="settings__toggle-desc">Switch between light and dark themes</span>
            </div>
            <button
              className={`settings__switch ${isDark ? 'settings__switch--on' : ''}`}
              onClick={toggleTheme}
              id="theme-toggle-settings"
            >
              <div className="settings__switch-thumb">
                {isDark ? <FiMoon size={12} /> : <FiSun size={12} />}
              </div>
            </button>
          </div>
          <div className="settings__theme-preview">
            <div className={`settings__theme-card ${!isDark ? 'settings__theme-card--active' : ''}`} onClick={() => isDark && toggleTheme()}>
              <div className="settings__theme-mockup settings__theme-mockup--light">
                <div className="settings__theme-bar" />
                <div className="settings__theme-line" />
                <div className="settings__theme-line settings__theme-line--short" />
              </div>
              <span>Light</span>
            </div>
            <div className={`settings__theme-card ${isDark ? 'settings__theme-card--active' : ''}`} onClick={() => !isDark && toggleTheme()}>
              <div className="settings__theme-mockup settings__theme-mockup--dark">
                <div className="settings__theme-bar" />
                <div className="settings__theme-line" />
                <div className="settings__theme-line settings__theme-line--short" />
              </div>
              <span>Dark</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings__section">
        <div className="settings__section-header">
          <FiBell className="settings__section-icon" />
          <div>
            <h3 className="settings__section-title">Notifications</h3>
            <p className="settings__section-desc">Choose what you get notified about</p>
          </div>
        </div>
        <div className="settings__card">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about team changes' },
            { key: 'push', label: 'Push Notifications', desc: 'Get browser push notifications' },
            { key: 'updates', label: 'Product Updates', desc: 'Receive updates about new features' },
            { key: 'reports', label: 'Weekly Reports', desc: 'Get weekly summary reports' },
          ].map((item) => (
            <div key={item.key} className="settings__toggle-row">
              <div className="settings__toggle-info">
                <span className="settings__toggle-label">{item.label}</span>
                <span className="settings__toggle-desc">{item.desc}</span>
              </div>
              <button
                className={`settings__switch ${notifications[item.key] ? 'settings__switch--on' : ''}`}
                onClick={() => handleNotifChange(item.key)}
              >
                <div className="settings__switch-thumb" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="settings__section">
        <div className="settings__section-header">
          <FiShield className="settings__section-icon" />
          <div>
            <h3 className="settings__section-title">Security</h3>
            <p className="settings__section-desc">Account security settings</p>
          </div>
        </div>
        <div className="settings__card">
          <div className="settings__security-item">
            <div>
              <span className="settings__toggle-label">Two-Factor Authentication</span>
              <span className="settings__toggle-desc">Add an extra layer of security</span>
            </div>
            <span className="settings__badge settings__badge--warning">Not Enabled</span>
          </div>
          <div className="settings__security-item">
            <div>
              <span className="settings__toggle-label">Login Sessions</span>
              <span className="settings__toggle-desc">Manage active sessions</span>
            </div>
            <span className="settings__badge settings__badge--success">1 Active</span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="settings__actions">
        <button className={`settings__save-btn ${saved ? 'settings__save-btn--saved' : ''}`} onClick={handleSave}>
          {saved ? (
            <>
              <FiCheck /> Saved Successfully!
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
}
