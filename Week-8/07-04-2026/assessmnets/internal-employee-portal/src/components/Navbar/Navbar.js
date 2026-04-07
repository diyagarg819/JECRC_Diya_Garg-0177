import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiBell, FiSearch } from 'react-icons/fi';
import './Navbar.css';

const pageTitles = {
  dashboard: 'Dashboard',
  employees: 'Employee Management',
  analytics: 'Analytics & Reports',
  settings: 'Settings',
};

export default function Navbar({ activePage }) {
  const { user } = useAuth();

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <header className="navbar">
      <div className="navbar__left">
        <h1 className="navbar__title">{pageTitles[activePage] || 'Dashboard'}</h1>
        <p className="navbar__greeting">
          {greeting}, <span className="navbar__greeting-name">{user?.name?.split(' ')[0]}</span> 👋
        </p>
      </div>

      <div className="navbar__right">
        <div className="navbar__search">
          <FiSearch className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            className="navbar__search-input"
            id="global-search"
          />
        </div>
        <button className="navbar__notification" id="notification-btn" aria-label="Notifications">
          <FiBell />
          <span className="navbar__notification-badge">3</span>
        </button>
        <div className="navbar__user-chip">
          <div className="navbar__user-avatar">{user?.avatar}</div>
          <span className="navbar__user-label">{user?.role}</span>
        </div>
      </div>
    </header>
  );
}
