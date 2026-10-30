"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const IDLE_TIMEOUT = 15 * 60 * 1000;
const WARNING_TIME = 60 * 1000;
const LAST_ACTIVITY_KEY = "customer_last_activity";

function hasCustomerSession(): boolean {
  if (typeof window === "undefined") return false;

  const cookieExists = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("token="));

  return (
    !!localStorage.getItem("access_token") ||
    !!localStorage.getItem("token") ||
    cookieExists
  );
}

function clearCustomerSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  localStorage.removeItem(LAST_ACTIVITY_KEY);

  const secure =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie =
    `token=; Path=/; Max-Age=0; SameSite=Lax${secure}`;

  document.cookie =
    `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secure}`;
}

export default function SessionManager() {
  const pathname = usePathname();

  const [active, setActive] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const lastWrite = useRef(0);

  const logout = useCallback((reason: "manual" | "idle") => {
    clearCustomerSession();
    setActive(false);
    setShowWarning(false);

    window.location.replace(
      reason === "idle"
        ? "/auth/login?reason=idle"
        : "/auth/login?reason=logout"
    );
  }, []);

  const recordActivity = useCallback(() => {
    if (!hasCustomerSession()) return;

    const now = Date.now();

    if (now - lastWrite.current >= 1000) {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
      lastWrite.current = now;
    }

    setShowWarning(false);
    setSecondsLeft(60);
  }, []);

  // Detect customer login and check whether an old session has expired.
  useEffect(() => {
    if (!hasCustomerSession()) {
      setActive(false);
      setShowWarning(false);
      return;
    }

    const lastActivity = Number(
      localStorage.getItem(LAST_ACTIVITY_KEY)
    );

    if (
      lastActivity &&
      Date.now() - lastActivity >= IDLE_TIMEOUT
    ) {
      logout("idle");
      return;
    }

    if (!lastActivity) {
      localStorage.setItem(
        LAST_ACTIVITY_KEY,
        String(Date.now())
      );
    }

    setActive(true);
  }, [pathname, logout]);

  // Monitor activity while a customer is logged in.
  useEffect(() => {
    if (!active) return;

    const events = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
      "mousemove",
    ] as const;

    events.forEach((event) =>
      window.addEventListener(event, recordActivity, {
        passive: true,
      })
    );

    const timer = window.setInterval(() => {
      const lastActivity = Number(
        localStorage.getItem(LAST_ACTIVITY_KEY) ||
          Date.now()
      );

      const remaining =
        IDLE_TIMEOUT - (Date.now() - lastActivity);

      if (remaining <= 0) {
        logout("idle");
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
      events.forEach((event) =>
        window.removeEventListener(event, recordActivity)
      );

      window.clearInterval(timer);
    };
  }, [active, logout, recordActivity]);

  if (!active) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => logout("manual")}
        style={{
          position: "fixed",
          bottom: 18,
          right: 18,
          zIndex: 10000,
          background: "#b42318",
          color: "#fff",
          border: 0,
          borderRadius: 7,
          padding: "11px 18px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Log out
      </button>

      {showWarning && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="session-warning-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10001,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              color: "#222",
              borderRadius: 12,
              padding: 28,
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2 id="session-warning-title">
              Your session is about to expire
            </h2>

            <p>
              You have been inactive. You will be logged out
              in {secondsLeft} seconds.
            </p>

            <button
              type="button"
              onClick={recordActivity}
              style={{
                padding: "11px 18px",
                background: "#1769aa",
                color: "#fff",
                border: 0,
                borderRadius: 6,
                cursor: "pointer",
                marginRight: 10,
              }}
            >
              Stay signed in
            </button>

            <button
              type="button"
              onClick={() => logout("manual")}
              style={{
                padding: "11px 18px",
                background: "#b42318",
                color: "#fff",
                border: 0,
                borderRadius: 6,
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