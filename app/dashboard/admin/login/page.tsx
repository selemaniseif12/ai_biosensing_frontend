"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    try {
      const res = await fetch("/api/admin/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ key })
      });

      const data = await res.json();

      if (data.valid) {
        localStorage.setItem("admin_token", data.token);
        window.location.href = "/dashboard/admin";
      } else {
        setError("Invalid admin key.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter admin key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          marginBottom: "12px",
          display: "block"
        }}
      />

      <button
        onClick={submit}
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px"
        }}
      >
        Login
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
      )}
    </div>
  );
}
