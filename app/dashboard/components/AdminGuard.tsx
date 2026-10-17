"use client";

import React, { useEffect, useState } from "react";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminToken, setAdminToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Require a fresh token whenever this guard mounts.
    // Do not reuse or retain a previously saved admin token.
    localStorage.removeItem("admin_token");
    setAuthorized(false);
    setChecking(false);
  }, []);

  async function validateToken(token: string) {
    const cleanToken = token.trim();

    if (!cleanToken) {
      setError("Please enter your administrator token.");
      return;
    }

    setChecking(true);
    setError("");

    try {
      const response = await fetch("/api/admin/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: cleanToken }),
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.access === "granted") {
        // Keep the token in component state only.
        // Do not save it in localStorage.
        setAdminToken("");
        setAuthorized(true);
      } else {
        setAuthorized(false);

        setError(
          response.status === 502
            ? "Could not contact the backend. Please try again."
            : "Access denied. The administrator token is invalid or expired."
        );
      }
    } catch {
      setAuthorized(false);
      setError(
        "Could not validate the token. Check your connection and try again."
      );
    } finally {
      setChecking(false);
    }
  }

  function submitToken(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void validateToken(adminToken);
  }

  if (checking) {
    return (
      <div
        role="status"
        style={{
          maxWidth: "440px",
          margin: "24px auto",
          padding: "24px",
          textAlign: "center",
        }}
      >
        Checking administrator access...
      </div>
    );
  }

  if (!authorized) {
    return (
      <main
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "440px",
          margin: "24px auto",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
          color: "#222",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Admin &amp; System Access</h2>

        <p>
          Enter your existing administrator token to unlock this section.
        </p>

        <form onSubmit={submitToken}>
          <label
            htmlFor="admin-token"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Administrator Token
          </label>

          <input
            id="admin-token"
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="Enter your existing admin token"
            autoComplete="off"
            required
            disabled={checking}
            style={{
              boxSizing: "border-box",
              width: "100%",
              padding: "12px",
              marginBottom: "14px",
              border: "1px solid #aaa",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            disabled={checking}
            style={{
              boxSizing: "border-box",
              width: "100%",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: checking ? "#888" : "#1769aa",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 600,
              cursor: checking ? "wait" : "pointer",
            }}
          >
            {checking ? "Validating..." : "Unlock Admin & System"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            style={{
              color: "#c62828",
              marginTop: "14px",
              overflowWrap: "anywhere",
            }}
          >
            {error}
          </p>
        )}
      </main>
    );
  }

  return <>{children}</>;
}