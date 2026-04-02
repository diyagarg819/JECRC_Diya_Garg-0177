import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="main-wrapper">
      <aside className="sidebar" style={{ background: '#1e293b' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '20px', letterSpacing: '1px' }}>DASHBOARD</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/dashboard" style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.1)' }}>Overview</Link>
          <Link to="/dashboard/analytics" style={{ padding: '12px', borderRadius: '8px' }}>Analytics</Link>
          <Link to="/dashboard/settings" style={{ padding: '12px', borderRadius: '8px' }}>Settings</Link>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '16px 0' }} />
          <Link to="/" style={{ padding: '12px', borderRadius: '8px', color: '#94a3b8' }}>← Back to Store</Link>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: '600', color: '#1e293b' }}>Panel Overview</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: '#64748b', fontSize: '14px' }}>Logged in as: <strong>{user?.email || 'Admin'}</strong></span>
            <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Logout</button>
          </div>
        </header>

        <main className="page-content" style={{ background: '#ffffff' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
