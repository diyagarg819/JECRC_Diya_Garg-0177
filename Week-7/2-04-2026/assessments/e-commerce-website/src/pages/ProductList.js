import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Enterprise Laptop Pro', price: '$1,299.99', category: 'Computing' },
  { id: 2, name: 'Cloud Station X1', price: '$499.00', category: 'Hardware' },
  { id: 3, name: 'Quantum Core Processor', price: '$899.50', category: 'Components' },
  { id: 4, name: 'Secure Gateway Router', price: '$249.99', category: 'Networking' },
];

const ProductList = () => {
  return (
    <div>
      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Product Catalog</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Browse our enterprise-grade equipment.</p>
      
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <span style={{ fontSize: '48px', opacity: '0.2' }}>📦</span>
            </div>
            <div className="product-info">
              <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase' }}>{product.category}</span>
              <h3 style={{ margin: '8px 0', fontSize: '18px' }}>{product.name}</h3>
              <p style={{ fontWeight: '700', fontSize: '20px', marginBottom: '16px' }}>{product.price}</p>
              <Link to={`/products/${product.id}`} className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', width: '100%', padding: '12px' }}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
