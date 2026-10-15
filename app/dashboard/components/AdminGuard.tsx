"use client";

import { useEffect, useState } from "react";

type AdminGuardProps = {
  children: React.ReactNode;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-render-backend.onrender.com";

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function verifyAdminToken(adminToken: string) {
    try {
      const response = await fetch(
        `${API_BASE}/admin-system/?token=${encodeURIComponent(
          adminToken
        )}`
      );

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      const result = await response.json();

      if (result.access === "granted") {
        localStorage.setItem(
          "admin_token",
          adminToken
        );

        setAuthorized(true);
        setError("");
        return;
      }

      throw new Error("Access denied");
    } catch {
      localStorage.removeItem("admin_token");
      setAuthorized(false);
      setError("Invalid administrator token.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedToken =
      localStorage.getItem("admin_token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    verifyAdminToken(storedToken);
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    await verifyAdminToken(token);
  }

  if (loading) {
    return (
      <div style={{ padding: "24px" }}>
        <p>Verifying administrator token...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "60px auto",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <h2>Administrator Token Required</h2>

        <p>
          Enter a valid administrator token
          to access Admin & System.
        </p>

        {error && (
          <div
            style={{
              color: "#c62828",
              marginBottom: "12px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={token}
            onChange={(e) =>
              setToken(e.target.value)
            }
            placeholder="Admin token"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#17365d",
              color: "#fff",
              border: 0,
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Enter Admin & System
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}