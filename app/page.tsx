async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=10", {
    cache: "force-cache"
  });

  return res.json();
}

export default async function Home() {
  const data = await getProducts();
  const products = data.products;

  return (
    <main style={{ padding: 20 }}>
      <h1>Product List (SSG)</h1>

      {products.map((product: any) => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </main>
  );
}