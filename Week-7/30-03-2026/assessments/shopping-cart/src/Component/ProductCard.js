import React from "react";

function ProductCard({ product, onAddToCart, isCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {/* 👇 Show button only in product list */}
      {!isCart && (
        <button onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;