"use client";

import { createContext, useState } from "react";

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart((prev) => [...prev, product]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}