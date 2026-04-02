import React from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();

  const productData = {
    1: { name: 'Enterprise Laptop Pro', price: '$1,299.99', description: 'High-performance laptop for enterprise use.' },
    2: { name: 'Cloud Station X1', price: '$499.00', description: 'Scalable cloud hardware for modern businesses.' },
    3: { name: 'Quantum Core Processor', price: '$899.50', description: 'Next-gen processing unit for server workloads.' },
    4: { name: 'Secure Gateway Router', price: '$249.99', description: 'Enterprise-grade networking security.' },
  }[productId] || { name: 'Unknown Product', price: 'N/A', description: 'Product not found.' };

  // Check if we are currently on a nested route
  const isNested = location.pathname.includes('reviews') || location.pathname.includes('specs');

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link to="/products" style={{ color: '#6366f1', fontWeight: '600', fontSize: '14px' }}>← All Products</Link>
        <h1 style={{ fontSize: '32px', marginTop: '16px' }}>{productData.name}</h1>
        <p style={{ fontSize: '24px', fontWeight: '700', color: '#6366f1', margin: '8px 0' }}>{productData.price}</p>
        <p style={{ color: '#64748b', lineHeight: '1.6' }}>{productData.description}</p>
      </div>

      <div style={{ borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <Link 
          to="reviews" 
          style={{ 
            padding: '12px 0', 
            borderBottom: location.pathname.includes('reviews') ? '2px solid #6366f1' : '2px solid transparent',
            color: location.pathname.includes('reviews') ? '#6366f1' : '#64748b',
            fontWeight: '600'
          }}
        >
          Customer Reviews
        </Link>
        <Link 
          to="specs" 
          style={{ 
            padding: '12px 0', 
            borderBottom: location.pathname.includes('specs') ? '2px solid #6366f1' : '2px solid transparent',
            color: location.pathname.includes('specs') ? '#6366f1' : '#64748b',
            fontWeight: '600'
          }}
        >
          Product Specifications
        </Link>
      </div>

      <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProductDetail;
