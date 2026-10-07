"use client";

import { useState, useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [status, setStatus] = useState("Checking admin access...");

  useEffect(() => {
    // Read token from cookies (correct)
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      setStatus("Admin token required: admin only");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin-system?token=${token}`)
      .then(res => {
        if (res.status === 403) {
          setStatus("Invalid admin token: admin only");
          return;
        }
        setAllowed(true);
        setStatus("Admin access granted");
      })
      .catch(() => {
        setStatus("Unable to validate admin token");
      });
  }, []);

  if (!allowed) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{status}</h2>
      </div>
    );
  }

  return <>{children}</>;
}
