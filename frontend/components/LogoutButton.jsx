import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove admin token
    localStorage.removeItem("admin_token");

    // Redirect to home
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      Logout
    </button>
  );
}
