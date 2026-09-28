"use client";

import { useState } from "react";

export default function PublicLogin() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    try {
      const res = await fetch("/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ apiKey })
      });

      const data = await res.json();

      if (data.valid) {
        localStorage.setItem("access_token", data.token);
        window.location.href = "/dashboard";
      } else {
        setError("Invalid API key.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Public Login</h2>

      <input
        type="password"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
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
