import React from 'react';

const DashboardHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Home</h1>
      <p style={{ marginTop: '16px', color: '#64748b' }}>
        Welcome to the authenticated dashboard area. This is the main landing page for logged-in users.
      </p>
      <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>User Overview</h3>
        <p>You have successfully logged into the enterprise management system.</p>
      </div>
    </div>
  );
};

export default DashboardHome;
