import React from "react";
import ProductCard from "./ProductCard";

function Cart({ cartItems }) {
  return (
    <div className="cart">
      <h2> Cart Items</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="grid">
          {cartItems.map((item, index) => (
            <ProductCard key={index} product={item} isCart={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;