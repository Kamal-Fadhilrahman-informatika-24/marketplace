"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/dashboard");
    } else {
      setError("Email atau Password salah!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400">

      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          🔐 Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-400 transition"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 hover:shadow-xl transition duration-300"
          >
            🚀 Login
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm font-semibold text-purple-700 hover:underline"
          >
            ← Kembali ke Home
          </a>
        </div>
      </div>
    </div>
  );
}