"use client";

export default function SettingsPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Settings</h1>

      {/* PROFILE SETTINGS */}
      <section
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Profile Settings</h2>
        <p>Manage your name, email, and government access credentials.</p>

        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#0057b8",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>
      </section>

      {/* API TOKEN SETTINGS */}
      <section
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>API Token & Security</h2>
        <p>View or regenerate your API token for secure backend access.</p>

        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#333",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Regenerate Token
        </button>
      </section>

      {/* TEAM SETTINGS */}
      <section
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Team Settings</h2>
        <p>Manage team members, roles, and meeting permissions.</p>

        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#464EB8",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Manage Team
        </button>
      </section>

      {/* SYSTEM SETTINGS */}
      <section
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>System Configuration</h2>
        <p>Control biosensing system preferences and dashboard behavior.</p>

        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#34A853",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          System Preferences
        </button>
      </section>

      {/* UI SETTINGS */}
      <section
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Appearance</h2>
        <p>Switch between light and dark mode.</p>

        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#000",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Toggle Dark Mode
        </button>
      </section>
    </div>
  );
}
