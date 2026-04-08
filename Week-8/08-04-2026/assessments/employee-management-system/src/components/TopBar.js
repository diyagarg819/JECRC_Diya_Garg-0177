import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme, toggleSidebar } from '../redux/slices/uiSlice';

const TopBar = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const { theme, sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="topbar" id="topbar">
      <div className="topbar-left">
        <button
          className="topbar-toggle"
          onClick={() => dispatch(toggleSidebar())}
          id="btn-toggle-sidebar"
          title="Toggle sidebar"
        >
          {sidebarCollapsed ? '☰' : '✕'}
        </button>
        <div className="topbar-title">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-actions">
        <button
          className="btn-theme-toggle"
          onClick={() => dispatch(toggleTheme())}
          id="btn-toggle-theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          className="btn-logout"
          onClick={() => dispatch(logout())}
          id="btn-logout"
        >
          <span>⏻</span>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
