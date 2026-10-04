"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => null);
        setError(msg?.detail || "Invalid email or password");
        return;
      }

      const data = await res.json();

      // Store only token (no role needed anymore)
      document.cookie = `token=${data.access_token}; path=/`;

      // Everyone goes to dashboard now
      router.push("/dashboard");

    } catch (err) {
      setError("Server error. Try again.");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Login
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
      </form>
    </div>
  );
}
