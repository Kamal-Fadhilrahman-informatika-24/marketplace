"use client";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function AddToCartButton({ product }: any) {
  const context = useContext(CartContext);
  if (!context) return null;

  const { addToCart } = context;

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        marginTop: 10,
        padding: 8,
        backgroundColor: "green",
        color: "white",
      }}
    >
      Add to Cart
    </button>
  );
}