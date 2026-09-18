"use client";

import Link from "next/link";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          padding: 16,
          borderRight: "1px solid #eee",
        }}
      >
        <h2>Student Dashboard</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link href="/dashboard/student">My Courses</Link>
            </li>
            <li>
              <Link href="/dashboard/student/profile">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/student/payments">Payments</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
