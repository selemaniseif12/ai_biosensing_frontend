"use client";

import { useEffect, useState } from "react";
import { refreshToken } from "./refreshToken";

export default function RequireToken({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function check() {
      // Try to refresh the public access token
      const newToken = await refreshToken("public");

      // If refresh succeeded, newToken will exist
      setValid(!!newToken);

      // Mark component as ready to render
      setReady(true);
    }

    check();
  }, []);

  // While refreshing token
  if (!ready) {
    return <p style={{ padding: "24px" }}>Checking access token...</p>;
  }

  // If refresh failed or no token exists
  if (!valid) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Access Restricted</h2>
        <p>You need an access token to view this dashboard.</p>
      </div>
    );
  }

  // Token is valid → allow access
  return children;
}
