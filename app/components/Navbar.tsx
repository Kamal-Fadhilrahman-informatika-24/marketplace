"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";

export default function Navbar() {
  const { cart } = useCart();
  const { favorites } = useFavorite();

  return (
    <nav className="bg-black/30 backdrop-blur-md text-white px-6 py-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          ⚡ Kamal Store
        </h1>

        {/* Menu */}
        <div className="flex gap-6 text-lg font-semibold items-center">

          <Link href="/" className="hover:text-yellow-300 transition">
            🏠 Home
          </Link>

          <Link href="/search" className="hover:text-blue-300 transition">
            🔎 Search
          </Link>

          <Link href="/favorite" className="hover:text-pink-300 transition">
            ❤️ Favorite ({favorites.length})
          </Link>

          <Link href="/cart" className="hover:text-green-300 transition">
            🛒 Cart ({cart.length})
          </Link>

        </div>
      </div>
    </nav>
  );
}
