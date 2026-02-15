"use client";

import { useState, useEffect } from "react";
import { useFavorite } from "@/app/context/FavoriteContext";

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
};

export default function FavoriteButton({ product }: { product: Product }) {
  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  const [isFav, setIsFav] = useState(false);

  // Cek apakah produk sudah ada di favorite
  useEffect(() => {
    const exists = favorites.some((item) => item.id === product.id);
    setIsFav(exists);
  }, [favorites, product.id]);

  const handleToggle = () => {
    if (isFav) {
      removeFromFavorite(product.id);
    } else {
      addToFavorite(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`mt-3 px-6 py-2 rounded-full font-bold transition duration-300 ${
        isFav
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-gray-500 hover:bg-gray-600 text-white"
      }`}
    >
      {isFav ? "❤️ Favorited" : "🤍 Add to Favorite"}
    </button>
  );
}