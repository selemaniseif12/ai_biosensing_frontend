"use client";
import { useState } from "react";

export default function CourseAccessButton({ courseId }) {
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);
  const [manualToken, setManualToken] = useState("");

  const handleAccess = async () => {
    if (!manualToken.trim()) {
      setStatus("Please enter a valid token.");
      return;
    }

    setStatus("Checking token...");

    try {
      const response = await fetch(`/api/proxy/services/course/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: manualToken })
      });

      if (!response.ok) {
        setStatus("Invalid or inactive token.");
        return;
      }

      const json = await response.json();
      setData(json);
      setStatus("Access granted.");
    } catch (err) {
      console.error("Course access error:", err);
      setStatus("Server error.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Course Access</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          placeholder="Paste your token here"
          value={manualToken}
          onChange={(e) => setManualToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>

      <button
        onClick={handleAccess}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0078ff",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Access Course {courseId}
      </button>

      <p style={{ marginTop: "10px" }}>{status}</p>

      {data && (
        <pre
          style={{
            marginTop: "20px",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
