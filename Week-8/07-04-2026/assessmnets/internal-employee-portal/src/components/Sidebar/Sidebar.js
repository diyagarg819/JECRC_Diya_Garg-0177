import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'employees', label: 'Employees', icon: FiUsers },
  { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ activePage, onNavigate }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">EP</div>
          {!collapsed && <span className="sidebar__logo-text">Employee Portal</span>}
        </div>
        <button
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* User Profile */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar">{user?.avatar}</div>
        {!collapsed && (
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">{user?.name}</span>
            <span className="sidebar__user-role">{user?.role}</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar__nav-item ${activePage === item.id ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : ''}
            >
              <Icon className="sidebar__nav-icon" />
              {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
              {activePage === item.id && <div className="sidebar__nav-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <button className="sidebar__footer-btn" onClick={toggleTheme} title={isDark ? 'Light Mode' : 'Dark Mode'}>
          {isDark ? <FiSun /> : <FiMoon />}
          {!collapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button className="sidebar__footer-btn sidebar__footer-btn--logout" onClick={logout} title="Logout">
          <FiLogOut />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
