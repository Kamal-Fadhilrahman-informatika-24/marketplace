"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
};

type FavoriteContextType = {
  favorites: Product[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (id: number) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToFavorite = (product: Product) => {
    setFavorites((prev) => [...prev, product]);
  };

  const removeFromFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorite, removeFromFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite harus digunakan di dalam FavoriteProvider");
  }
  return context;
}