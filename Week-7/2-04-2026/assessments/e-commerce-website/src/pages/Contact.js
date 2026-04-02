import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '40px 0', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Contact Us</h1>
      <p style={{ marginBottom: '32px', color: 'var(--text-muted)' }}>
        Have questions? Fill out the form below and our team will get back to you within 24 hours.
      </p>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: '500' }}>Name</label>
          <input type="text" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="Your name" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: '500' }}>Email</label>
          <input type="email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="Your email" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: '500' }}>Message</label>
          <textarea rows="5" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="Your message"></textarea>
        </div>
        <button type="button" className="btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
