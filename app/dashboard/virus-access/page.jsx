"use client";

import { useState } from "react";
import { issueToken, validateToken, getStoredToken } from "../ServiceTokenClient.jsx";

export default function VirusAccessButton({ virusService, userId }) {
  const [status, setStatus] = useState("");
  const [virusData, setVirusData] = useState(null);

  const handleAccess = async () => {
    setStatus("Checking token...");

    const serviceName = `virus_${virusService}`;
    const isValid = await validateToken(serviceName);
    let token = getStoredToken(serviceName);

    if (!isValid) {
      setStatus("Issuing new token...");
      token = await issueToken(serviceName, userId);
    }

    setStatus("Accessing virus service...");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/services/virus/${virusService}?token=${token}`
      );

      if (response.status === 403) {
        setStatus("Invalid or inactive token");
        return;
      }

      const data = await response.json();
      setVirusData(data);
      setStatus("Virus service access granted");
    } catch (error) {
      console.error("Error accessing virus service:", error);
      setStatus("Error accessing virus service");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <button
        onClick={handleAccess}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Access Virus Service: {virusService}
      </button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      {virusData && (
        <pre
          style={{
            marginTop: "10px",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {JSON.stringify(virusData, null, 2)}
        </pre>
      )}
    </div>
  );
}
