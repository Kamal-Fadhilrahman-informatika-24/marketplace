import { Product } from "./types/product";
import Link from "next/link";
import dynamic from "next/dynamic";
const AddToCartButton = dynamic(
  () => import("./components/AddToCartButton"),
  { ssr: false }
);

export const revalidate = 10;

async function getProducts(): Promise<{ products: Product[] }> {
  const res = await fetch("https://dummyjson.com/products?limit=10");

  return res.json();
}

export default async function Home() {
  const data = await getProducts();
  const products: Product[] = data.products;

 return (
  <main className="p-10">
    <h1 className="text-4xl font-extrabold text-center mb-10 text-yellow-300">
      ⚡ Product List
    </h1>
<div className="flex justify-center mb-8">
  <Link
    href="/cart"
    className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
  >
    🛒 Go To Cart
  </Link>
</div>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product: Product) => (
  <div
  key={product.id}
  className="bg-black text-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
>
  <span className="inline-block bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full mb-3">
    HOT
  </span>

  <h3 className="text-xl font-bold mb-2">
    {product.title}
  </h3>

  <p className="text-pink-500 font-extrabold text-lg mb-3">
    ${product.price}
  </p>

  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
    {product.description}
  </p>

  <div className="flex flex-col gap-3">
    <Link
      href={`/product/${product.id}`}
      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold text-center"
    >
      View Detail
    </Link>

    <AddToCartButton product={product} />
  </div>
</div>
      ))}
    </div>
  </main>
);
}