import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Welcome to Enterprise Shop</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px' }}>
        Discover the highest-quality premium products with our enterprise-grade e-commerce experience.
      </p>
      <div style={{ marginTop: '32px', padding: '40px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px' }}>
        <h3>Featured Collections</h3>
        <p>Explore our curated selection of top-selling items.</p>
      </div>
    </div>
  );
};

export default Home;
