import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { Suspense } from "react";
import ProductInfo from "./ProductInfo";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-5xl mx-auto p-10">
      
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-10">
        🚀 Product Detail
      </h1>

      <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl space-y-6">

        {/* Suspense Streaming */}
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold animate-pulse">
              Loading Product Info...
            </div>
          }
        >
          <ProductInfo id={params.id} />
        </Suspense>

       

          <Link href="/cart">
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition duration-300 shadow-lg">
              🛒 Go to Cart
            </button>
          </Link>
        </div>
     

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/"
          className="text-white font-semibold underline hover:text-yellow-300 transition"
        >
          ← Back to Home
        </Link>
      </div>

    </main>
  );
}
