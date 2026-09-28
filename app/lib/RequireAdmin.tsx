"use client";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  if (!token) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Admin Access Required</h2>
        <p>This dashboard is restricted to authorized personnel.</p>
      </div>
    );
  }

  return children;
}
