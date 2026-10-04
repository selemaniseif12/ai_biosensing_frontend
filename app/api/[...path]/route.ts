"use client";

import { createElement, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      // Handle backend errors (401, 422, etc.)
      if (!res.ok) {
        const msg = await res.json().catch(() => null);
        setError(msg?.detail || "Invalid email or password");
        return;
      }

      const data = await res.json();

      // Save JWT token
      localStorage.setItem("token", data.access_token);

      // Save user info
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("email", data.email);

      // Save role from backend (admin or student)
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

    } catch (err) {
      setError("Server error. Try again.");
    }
  }

  return createElement(
    "div",
    { style: { padding: "40px" } },
    createElement("h1", null, "Login"),
    createElement(
      "form",
      {
        onSubmit: handleLogin,
        style: { display: "flex", flexDirection: "column", width: "300px" },
      },
      createElement("label", null, "Email"),
      createElement("input", {
        type: "email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        required: true,
      }),
      createElement("label", null, "Password"),
      createElement("input", {
        type: "password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        required: true,
      }),
      createElement("button", { type: "submit", style: { marginTop: "20px" } }, "Login"),
      error
        ? createElement("p", { style: { color: "red", marginTop: "10px" } }, error)
        : null,
    ),
  );
}
