import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!token || token.length < 10) {
      setError("Invalid token");
      return;
    }

    // Store token in localStorage
    localStorage.setItem("admin_token", token);

    // Redirect to admin dashboard
    router.push("/admin/dashboard");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Admin Login</h2>

      <label>Enter Admin Token</label>
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}
