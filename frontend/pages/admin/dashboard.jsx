import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");

    if (!storedToken) {
      router.push("/admin/login");
      return;
    }

    setToken(storedToken);
  }, []);

  if (!token) {
    return <p>Checking admin access...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, admin. Your token is active.</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
