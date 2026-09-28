"use client";

export default function RequireToken({ children }: { children: React.ReactNode }) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  if (!token) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Access Restricted</h2>
        <p>You need an access token to view this dashboard.</p>
      </div>
    );
  }

  return children;
}
