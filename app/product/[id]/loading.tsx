export default function Loading() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Loading Product...</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 20,
          marginTop: 20,
        }}
      >
        <div
          style={{
            width: "60%",
            height: 20,
            backgroundColor: "#ddd",
            marginBottom: 10,
          }}
        />

        <div
          style={{
            width: "40%",
            height: 20,
            backgroundColor: "#eee",
          }}
        />
      </div>
    </main>
  );
}