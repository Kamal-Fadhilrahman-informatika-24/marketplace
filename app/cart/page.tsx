"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-white text-lg">
          Cart masih kosong.
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white text-gray-900 p-6 rounded-2xl shadow-2xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-pink-600 font-semibold">
                  ${item.price}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold transition"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}