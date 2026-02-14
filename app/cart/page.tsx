"use client";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const context = useContext(CartContext);

  if (!context) return null;

  const { cart } = context;

  return (
    <main style={{ padding: 20 }}>
      <h1>Cart (Global State)</h1>

      {cart.length === 0 && <p>Cart kosong</p>}

      {cart.map((item, index) => (
        <div key={index}>
          {item.title} - ${item.price}
        </div>
      ))}
    </main>
  );
}