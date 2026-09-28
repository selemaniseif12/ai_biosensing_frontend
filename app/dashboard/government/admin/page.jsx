"use client";

import RequireRole from "@/app/lib/RequireRole";

export default function GovernmentAdminPage() {
  return (
    <RequireRole role="government">
      <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
        
        <button
          style={{
            padding: "10px 20px",
            background: "#4699D7",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Schedule a Government Consultation
        </button>

        <h2 style={{ marginTop: "40px" }}>Our Technology</h2>
        <ul>
          <li>Real time airborne pathogen detection</li>
          <li>Femtogram mass resolution</li>
        </ul>

      </div>
    </RequireRole>
  );
}
