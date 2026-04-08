import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme, toggleSidebar } from '../redux/slices/uiSlice';

const Sidebar = ({ activeView, setActiveView }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme, sidebarCollapsed } = useSelector((state) => state.ui);

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'employees', icon: '👥', label: 'Employees' },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🏢</div>
        <h2>EmpManager</h2>
      </div>

      {/* Navigation */}
      <nav>
        <span className="nav-section-title">Main Menu</span>
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}

        <span className="nav-section-title">Preferences</span>
        <button className="nav-item" onClick={() => dispatch(toggleTheme())} id="btn-toggle-theme-sidebar">
          <span className="nav-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="nav-label">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user ? getInitials(user.name) : 'U'}
          </div>
          <div className="sidebar-user-info">
            <h4>{user?.name || 'User'}</h4>
            <p>{user?.role || 'Guest'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
