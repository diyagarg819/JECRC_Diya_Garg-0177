import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Badge } from '../ui';
import { getRoleColor } from '../../utils/data';

const NAV_ITEMS = {
  admin: [
    { id: 'dashboard', icon: '⊡', label: 'Dashboard' },
    { id: 'employees', icon: '◉', label: 'Employees' },
    { id: 'profile',   icon: '◎', label: 'My Profile' },
  ],
  employee: [
    { id: 'dashboard', icon: '⊡', label: 'Dashboard' },
    { id: 'profile',   icon: '◎', label: 'My Profile' },
  ],
};

export default function Sidebar({ currentPage, onNavigate }) {
  const { user, logout } = useAuth();
  const navItems = NAV_ITEMS[user.role] || NAV_ITEMS.employee;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🏢</div>
        <span className="logo-text">CorpPortal</span>
      </div>

      {/* Current user chip */}
      <div className="sidebar-user">
        <Avatar name={user.name} id={user.id} size="md" />
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div
            className="ellipsis"
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}
          >
            {user.name}
          </div>
          <Badge
            label={user.role}
            color={getRoleColor(user.role)}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="nav-section-label">Navigation</p>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item${currentPage === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <span style={{ fontSize: 14 }}>↪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
