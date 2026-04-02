import React from 'react';

const ProductSpecs = () => {
  const specs = [
    { label: 'Display', value: '16-inch Enterprise OLED (3840 x 2400)' },
    { label: 'Processor', value: '10-core Enterprise Silicon' },
    { label: 'Graphics', value: '32-core Professional GPU' },
    { label: 'Memory', value: '64GB Unified Architecture' },
    { label: 'Storage', value: '2TB Enterprise SSD' },
    { label: 'Security', value: 'Hardware-based Encryption Module' },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: '24px' }}>Technical Specifications</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {specs.map((spec, index) => (
          <div key={index} style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>{spec.label}</span>
            <p style={{ marginTop: '4px', fontWeight: '500', fontSize: '16px' }}>{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecs;
