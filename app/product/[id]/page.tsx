import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ProductInfo from "./ProductInfo";

const AddToCartButton = dynamic(
  () => import("./AddToCartButton"),
  {
    loading: () => <p>Loading Button...</p>,
  }
);

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ padding: 20 }}>
      <h1>Product Detail (SSR + Streaming)</h1>

      <div style={{ border: "1px solid #ccc", padding: 20 }}>
        <Suspense fallback={<p>Loading Product Info...</p>}>
          <ProductInfo id={params.id} />
        </Suspense>

        <FavoriteButton />

        <Link href="/cart">
          <button style={{ marginTop: 10 }}>Go to Cart</button>
        </Link>
      </div>
    </main>
  );
}
