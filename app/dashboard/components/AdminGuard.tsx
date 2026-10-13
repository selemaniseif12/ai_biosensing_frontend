"use client";

import { useEffect, useState } from "react";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const [checked, setChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    setHasToken(Boolean(token));
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div style={{ padding: "24px" }}>
        <p>Checking administrator access...</p>
      </div>
    );
  }

  if (!hasToken) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Admin Access Required</h2>
        <p>This dashboard is restricted to authorized personnel.</p>
      </div>
    );
  }

  return <>{children}</>;
}