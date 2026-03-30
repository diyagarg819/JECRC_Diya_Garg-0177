import React from "react";
import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Nike Shoes", price: 2999, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Headphones", price: 1999, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Smart Watch", price: 4999, image: "https://via.placeholder.com/150" }
];

function ProductList({ onAddToCart }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;