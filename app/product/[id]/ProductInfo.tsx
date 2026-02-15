import dynamic from "next/dynamic";
import { Product } from "@/app/types/product";

const AddToCartButton = dynamic(
  () => import("./AddToCartButton"),
  {
    loading: () => <p>Loading Button...</p>,
  }
);

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Fetch gagal");

    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductInfo({ id }: { id: string }) {
  const product = await getProduct(id);

  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><b>Price:</b> ${product.price}</p>

      <AddToCartButton product={product} />
    </>
  );
}