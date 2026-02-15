"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition duration-300 shadow-lg"
      >
        🛒 Add to Cart
      </button>

      {added && (
        <p className="text-green-600 font-semibold mt-2 animate-pulse">
          ✅ Berhasil ditambahkan!
        </p>
      )}
    </div>
  );
}