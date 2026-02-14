"use client";

import { useState, useEffect } from "react";
import { Product } from "../types/product";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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

  // Filter setiap kali query berubah
  useEffect(() => {
    const result = allProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(result);
  }, [query, allProducts]);

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