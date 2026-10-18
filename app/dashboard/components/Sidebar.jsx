"use client";

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const isAdmin =
    typeof window !== "undefined"
      ? !!localStorage.getItem("admin_token")
      : false;

  return (
    <div
      style={{
        width: "240px",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        height: "100vh",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Dashboard</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Home */}
        <Link href="/dashboard">Home</Link>

        {/* Government Portal */}
        <Link href="/dashboard/government">Government Portal</Link>

        <hr style={{ borderColor: "#ddd" }} />

        {/* Public Services */}
        <Link href="/dashboard/course-access">Course Access</Link>

        <Link href="/dashboard/ml-access">ML Access</Link>

        <Link href="/dashboard/virus-access">Virus Access</Link>

        {/* ADMIN‑ONLY LINKS */}
        {isAdmin && (
          <>
            <hr style={{ borderColor: "#ddd" }} />

            <Link href="/admin-system">Admin & System</Link>

            <Link href="/dashboard/admin">Admin Dashboard</Link>

            <Link href="/board/admin/students">Students</Link>

            <Link href="/dashboard/admin/logs">System Logs</Link>
          </>
        )}
      </nav>
    </div>
  );
}