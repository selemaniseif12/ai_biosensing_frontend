"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

type AdminGuardProps = {
  children: React.ReactNode;
};

const IDLE_TIMEOUT = 15 * 60 * 1000;
const WARNING_TIME = 60 * 1000;

export default function AdminGuard({ children }: AdminGuardProps) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminToken, setAdminToken] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const lastActivity = useRef(Date.now());

  // Do not reuse a previously stored administrator token.
  useEffect(() => {
    localStorage.removeItem("admin_token");
    setAuthorized(false);
    setChecking(false);
  }, []);

  const endSession = useCallback((message: string) => {
    localStorage.removeItem("admin_token");
    setAuthorized(false);
    setAdminToken("");
    setShowWarning(false);
    setError(message);
  }, []);

  const recordActivity = useCallback(() => {
    lastActivity.current = Date.now();
    setShowWarning(false);
    setSecondsLeft(60);
  }, []);

  // Monitor administrator inactivity.
  useEffect(() => {
    if (!authorized) return;

    lastActivity.current = Date.now();

    const events = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ] as const;

    events.forEach((event) => {
      window.addEventListener(event, recordActivity, {
        passive: true,
      });
    });

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - lastActivity.current;
      const remaining = IDLE_TIMEOUT - elapsed;

      if (remaining <= 0) {
        endSession(
          "Your administrator session expired due to inactivity. Please enter your token again."
        );
        return;
      }

      if (remaining <= WARNING_TIME) {
        setShowWarning(true);
        setSecondsLeft(Math.ceil(remaining / 1000));
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, recordActivity);
      });

      window.clearInterval(timer);
    };
  }, [authorized, recordActivity, endSession]);

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
        setAdminToken("");
        lastActivity.current = Date.now();
        setAuthorized(true);
        setShowWarning(false);
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
        <h2 style={{ marginTop: 0 }}>
          Admin &amp; System Access
        </h2>

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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          onClick={() =>
            endSession("You have successfully logged out.")
          }
          style={{
            padding: "10px 18px",
            backgroundColor: "#b42318",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </div>

      {children}

      {showWarning && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10002,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "420px",
              width: "100%",
              padding: "28px",
              borderRadius: "12px",
              background: "#fff",
              color: "#222",
              textAlign: "center",
            }}
          >
            <h2>Administrator session expiring</h2>

            <p>
              You will be logged out in {secondsLeft} seconds
              due to inactivity.
            </p>

            <button
              type="button"
              onClick={recordActivity}
              style={{
                padding: "11px 18px",
                marginRight: "10px",
                border: 0,
                borderRadius: "6px",
                background: "#1769aa",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Stay signed in
            </button>

            <button
              type="button"
              onClick={() =>
                endSession("You have successfully logged out.")
              }
              style={{
                padding: "11px 18px",
                border: 0,
                borderRadius: "6px",
                background: "#b42318",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Log out now
            </button>
          </div>
        </div>
      )}
    </>
  );
}