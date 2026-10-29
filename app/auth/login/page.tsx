"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-biosensing-backend-trial2.onrender.com"
).replace(/\/+$/, "");

type AuthResponse = {
  access_token?: string;
  detail?: string | Array<{ msg?: string }>;
  email?: string;
  user_id?: number;
  role?: string;
};

function getErrorMessage(data: AuthResponse, fallback: string): string {
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    const messages = data.detail.map((item) => item.msg).filter(Boolean);
    if (messages.length) return messages.join("; ");
  }
  return fallback;
}

async function postAuth(path: string, payload: Record<string, string>): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  const data: AuthResponse = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        data,
        response.status === 409
          ? "An account with this email may already exist. Please sign in."
          : "Unable to complete authentication. Please try again."
      )
    );
  }
  return data;
}

function safeNextPath(): string {
  let requested = new URLSearchParams(window.location.search).get("next");

  // When a checkout/store page sent the customer to login without a `next`
  // parameter, safely return them to that same-site shopping page.
  if (!requested && document.referrer) {
    try {
      const previous = new URL(document.referrer);
      const shoppingPath = /^\/dashboard\/admin\/(store|cart|checkout)(\/|$)/;
      if (previous.origin === window.location.origin && shoppingPath.test(previous.pathname)) {
        requested = `${previous.pathname}${previous.search}`;
      }
    } catch {
      // Ignore an invalid referrer and use the dashboard default.
    }
  }

  // Accept only local absolute paths; reject protocol-relative external URLs.
  if (requested && requested.startsWith("/") && !requested.startsWith("//")) {
    return requested;
  }
  return "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setError("");
    setBusy(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (!API_BASE) {
        throw new Error("The authentication server is not configured.");
      }

      if (mode === "register") {
        if (!fullName.trim()) {
          throw new Error("Please enter your full name.");
        }
        if (password.length < 8) {
          throw new Error("Please use a password with at least 8 characters.");
        }

        await postAuth("/auth/register", {
          full_name: fullName.trim(),
          email: normalizedEmail,
          password,
        });
      }

      // Registering creates an account; sign in separately to receive a JWT.
      const auth = await postAuth("/auth/login", {
        email: normalizedEmail,
        password,
      });

      if (!auth.access_token) {
        throw new Error("The server did not return a login token. Please try again.");
      }

      const token = auth.access_token;
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      // Keep both keys for compatibility with existing frontend components.
      // Never store a customer token as admin_token.
      localStorage.setItem("access_token", token);
      localStorage.setItem("token", token);
      document.cookie = `token=${encodeURIComponent(token)}; Path=/; Max-Age=86400; SameSite=Lax${secure}`;

      router.replace(safeNextPath());
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Server error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 440, margin: "48px auto", padding: 28, border: "1px solid #ddd", borderRadius: 12, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginTop: 0 }}>{mode === "login" ? "Customer Login" : "Create Customer Account"}</h1>
      <p style={{ color: "#555", lineHeight: 1.5 }}>
        {mode === "login"
          ? "Sign in with the email address and password registered to your customer account."
          : "Create your own customer account to save your cart and check out securely."}
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        {mode === "register" && (
          <label style={{ display: "grid", gap: 6 }}>
            Full name
            <input
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              maxLength={120}
              style={inputStyle}
            />
          </label>
        )}

        <label style={{ display: "grid", gap: 6 }}>
          Email address
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            maxLength={254}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={mode === "register" ? 8 : 1}
            style={inputStyle}
          />
        </label>

        {error && <p role="alert" style={{ color: "#b00020", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={busy} style={buttonStyle}>
          {busy ? "Please wait…" : mode === "login" ? "Log In" : "Create Account & Log In"}
        </button>
      </form>

      <div style={{ marginTop: 18, borderTop: "1px solid #eee", paddingTop: 16 }}>
        {mode === "login" ? "New customer? " : "Already registered? "}
        <button
          type="button"
          onClick={() => {
            setError("");
            setMode(mode === "login" ? "register" : "login");
          }}
          style={{ color: "#145dbf", background: "none", border: 0, cursor: "pointer", fontWeight: 600, padding: 0 }}
        >
          {mode === "login" ? "Create an account" : "Return to login"}
        </button>
      </div>
      <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>
        Use your own account. Administrator credentials and service API keys are not required for customer checkout.
      </p>
    </main>
  );
}

const inputStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  padding: "11px 12px",
  border: "1px solid #bbb",
  borderRadius: 6,
  fontSize: 16,
};

const buttonStyle: CSSProperties = {
  marginTop: 6,
  padding: "12px 16px",
  background: "#145dbf",
  color: "#fff",
  border: 0,
  borderRadius: 6,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};
