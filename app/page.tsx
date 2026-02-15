import { Product } from "./types/product";

export const revalidate = 10;

async function getProducts(): Promise<{ products: Product[] }> {
  const res = await fetch("https://dummyjson.com/products?limit=10");

  return res.json();
}

export default async function Home() {
  const data = await getProducts();
  const products: Product[] = data.products;

  return (
    <main style={{ padding: 20 }}>
      <h1>Product List (SSG)</h1>

      {products.map((product: Product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </main>
  );
}