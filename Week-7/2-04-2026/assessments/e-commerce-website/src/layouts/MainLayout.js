import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="main-wrapper">
      <aside className="sidebar">
        <h2 style={{ marginBottom: '24px', fontSize: '20px', letterSpacing: '1px' }}>ENTERPRISE</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', marginTop: '16px' }}>Public Website</div>
          <Link to="/" style={{ padding: '8px 12px', borderRadius: '4px' }}>Home Page</Link>
          <Link to="/about" style={{ padding: '8px 12px', borderRadius: '4px' }}>About Page</Link>
          <Link to="/contact" style={{ padding: '8px 12px', borderRadius: '4px' }}>Contact Page</Link>
          
          <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', marginTop: '16px' }}>Operations</div>
          <Link to="/products" style={{ padding: '8px 12px', borderRadius: '4px', backgroundColor: '#6366f1', color: 'white' }}>Product Module</Link>
          
          <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', marginTop: '16px' }}>Account</div>
          {isAuthenticated ? (
            <Link to="/dashboard" style={{ padding: '8px 12px', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }}>Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ padding: '8px 12px', borderRadius: '4px' }}>Log In</Link>
              <Link to="/register" style={{ padding: '8px 12px', borderRadius: '4px' }}>Register</Link>
            </>
          )}
        </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <div style={{ fontWeight: '600' }}>Storefront</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Welcome Guest</span>
            {isAuthenticated && (
              <button onClick={logout} style={{ background: '#ef4444', color: 'white', padding: '6px 12px', fontSize: '14px' }}>Logout</button>
            )}
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>

        <footer className="footer">
          <p>© 2026 Enterprise E-Commerce Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
