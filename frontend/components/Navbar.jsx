import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { adminToken } = useContext(AuthContext);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd"
      }}
    >
      <div>
        <Link href="/">
          <span style={{ marginRight: "20px", cursor: "pointer" }}>Home</span>
        </Link>

        <Link href="/store">
          <span style={{ marginRight: "20px", cursor: "pointer" }}>Marketplace</span>
        </Link>

        <Link href="/consulting">
          <span style={{ marginRight: "20px", cursor: "pointer" }}>Consulting</span>
        </Link>

        <Link href="/ml">
          <span style={{ marginRight: "20px", cursor: "pointer" }}>ML</span>
        </Link>

        <Link href="/docs">
          <span style={{ marginRight: "20px", cursor: "pointer" }}>Docs</span>
        </Link>

        <Link href="/virus-list">
          <span style={{ marginRight: "20px", cursor: "pointer" }}>Government</span>
        </Link>
      </div>

      <div>
        {adminToken ? (
          <>
            <Link href="/admin/dashboard">
              <span style={{ marginRight: "20px", cursor: "pointer" }}>Admin</span>
            </Link>
            <LogoutButton />
          </>
        ) : (
          <Link href="/admin/login">
            <span style={{ cursor: "pointer" }}>Admin Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
