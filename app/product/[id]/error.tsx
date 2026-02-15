"use client";

export default function ProductError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: 40 }}>
      <h2>⚠️ Terjadi Kesalahan pada Product</h2>
      <p>{error.message}</p>

      <button
        onClick={() => reset()}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Coba Lagi
      </button>
    </div>
  );
}