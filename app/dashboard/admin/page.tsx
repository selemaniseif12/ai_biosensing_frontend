import RequireAdmin from "@/app/lib/RequireAdmin";

export default function AdminDashboard() {
  return (
    <RequireAdmin>
      <div style={{ padding: "32px" }}>
        <h2>Admin Dashboard</h2>
        <p>Welcome, admin.</p>
      </div>
    </RequireAdmin>
  );
}
