import React from 'react';

const Settings = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Settings Page</h1>
      <p style={{ marginTop: '16px', color: '#64748b' }}>
        Adjust your enterprise-level preferences and security settings here.
      </p>

      <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Security Preferences</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Configure two-factor authentication and password updates.</p>
        </div>
        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Account Information</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Update your professional profile and email settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
