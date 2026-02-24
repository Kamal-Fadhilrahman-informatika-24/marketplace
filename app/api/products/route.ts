import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET semua produk
export async function GET() {
  const [rows] = await db.query("SELECT * FROM products");
  return NextResponse.json(rows);
}

// POST tambah produk
export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, price, stock } = body;

  await db.query(
    "INSERT INTO products (title, description, price, stock) VALUES (?, ?, ?, ?)",
    [title, description, price, stock]
  );

  return NextResponse.json({ message: "Product added" });
}

