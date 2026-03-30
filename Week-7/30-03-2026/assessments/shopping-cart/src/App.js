import React, { useState } from "react";
import ProductList from "./Component/Productlist";
import Cart from "./Component/Cart";


function App() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddToCart = (product) => {
    console.log(`${product.name} added to cart`);

    setCart((prev) => [...prev, product]); // 👈 add to cart
    setMessage(`${product.name} successfully added to cart`);
  };

  return (
    <div className="app">
      <h1>🛍️ E-Commerce Store</h1>

      <ProductList onAddToCart={handleAddToCart} />

      {message && <p className="message">{message}</p>}

      {/* 👇 Cart UI */}
      <Cart cartItems={cart} />
    </div>
  );
}

export default App;