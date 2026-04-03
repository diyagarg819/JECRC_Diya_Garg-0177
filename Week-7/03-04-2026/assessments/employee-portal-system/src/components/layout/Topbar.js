import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  employees: 'Employee Management',
  profile:   'My Profile',
};

export default function Topbar({ currentPage }) {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <span className="topbar-title">{PAGE_TITLES[currentPage] || currentPage}</span>
      <div className="topbar-right">
        <span className="topbar-email">{user.email}</span>
        <button type="button" className="topbar-logout-btn" onClick={logout}>
          Logout
        </button>
        <Avatar name={user.name} id={user.id} size="sm" />
      </div>
    </header>
  );
}
