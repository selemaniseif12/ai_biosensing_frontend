"use client";

import { getRole } from "./getRole";

export default function RequireRole({
  role,
  children
}: {
  role: string;
  children: React.ReactNode;
}) {
  const userRole = getRole();

  if (userRole !== role) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Access Restricted</h2>
        <p>You do not have permission to view this dashboard.</p>
      </div>
    );
  }

  return children;
}
