"use client";

import { useState, useEffect, useMemo } from "react";
import { Product } from "../types/product";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch sekali saat halaman load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=50");
        const data = await res.json();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetch:", error);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // 🔥 Memoized filtering
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [allProducts, query]);

 return (
  <main className="p-10">
    <h1 className="text-4xl font-extrabold text-yellow-300 mb-10">
      🔍 Search Product (CSR)
    </h1>

    {/* Input Search */}
    <input
      type="text"
      placeholder="Cari produk..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full max-w-lg px-5 py-3 rounded-full text-black font-semibold focus:ring-4 focus:ring-yellow-400 outline-none"
    />

    {loading && (
      <p className="mt-6 text-lg font-semibold animate-pulse">
        Loading...
      </p>
    )}

    {/* Hasil Search */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      {filteredProducts.map((product) => (
        <div
  key={product.id}
  className="bg-white text-gray-900 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
>
          <h3 className="text-xl font-bold mb-3">
            {product.title}
          </h3>

          <p className="text-pink-600 font-extrabold text-lg mb-4">
            ${product.price}
          </p>

          <Link
            href={`/product/${product.id}`}
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            View Detail
          </Link>
        </div>
      ))}
    </div>
  </main>
);
}