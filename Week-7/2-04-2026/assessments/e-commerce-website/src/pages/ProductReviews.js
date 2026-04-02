import React from 'react';

const ProductReviews = () => {
  const reviews = [
    { id: 1, user: 'Elena Rodriguez', rating: 5, comment: 'Exceptional performance for our design team. Highly recommend for enterprise scale.' },
    { id: 2, user: 'Marcus Chen', rating: 4, comment: 'Reliable build quality, though the cooling fan can be audible under heavy load.' },
    { id: 3, user: 'Sarah Jenkins', rating: 5, comment: 'Our entire engineering department switched to these. Seamless integration.' },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: '24px' }}>Customer Reviews</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {reviews.map(review => (
          <div key={review.id} style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600' }}>{review.user}</span>
              <span style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '15px' }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
