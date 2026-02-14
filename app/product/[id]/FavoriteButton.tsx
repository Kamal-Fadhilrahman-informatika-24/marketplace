"use client";

import { useState } from "react";

export default function FavoriteButton() {
  const [isFav, setIsFav] = useState(false);

  return (
    <button
      onClick={() => setIsFav(!isFav)}
      style={{
        marginTop: 10,
        padding: 8,
        backgroundColor: isFav ? "red" : "gray",
        color: "white",
      }}
    >
      {isFav ? "❤️ Favorited" : "🤍 Add to Favorite"}
    </button>
  );
}