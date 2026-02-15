import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Web Platform Project",
  description: "SSR, SSG, CSR Implementation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 min-h-screen text-white">
  <CartProvider>
  <FavoriteProvider>
    <Navbar />
    {children}
  </FavoriteProvider>
</CartProvider>
</body>
    </html>
  );
}
