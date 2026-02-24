import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const [rows]: any = await db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password]
  );

  if (rows.length > 0) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}