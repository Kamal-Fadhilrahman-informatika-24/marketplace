"use client";

import { useState, useEffect, useMemo } from "react";
import { Product } from "../types/product";

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
    <main style={{ padding: 20 }}>
      <h1>Search Product (CSR)</h1>

      <input
        type="text"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: 20 }}>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            {product.title}
          </div>
        ))}
      </div>
    </main>
  );
}