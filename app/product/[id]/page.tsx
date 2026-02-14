import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
async function getProduct(id: string) {
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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <h1>Gagal mengambil data</h1>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Product Detail (SSR)</h1>

      <div style={{ border: "1px solid #ccc", padding: 20 }}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><b>Price:</b> ${product.price}</p>
        <FavoriteButton />
<AddToCartButton product={product} />

<Link href="/cart">
  <button style={{ marginTop: 10 }}>Go to Cart</button>
</Link>

        {/* 🔥 Tambahkan ini */}
      </div>
    </main>
  );
}
