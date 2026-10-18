"use client";
import React, { useEffect, useState } from "react";

export default function GovernmentAdminViewer() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/government/all`
      );

      const data = await res.json();

      if (data.success) {
        setRecords(data.data);
      }
    } catch (err) {
      console.error("Error loading government records:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete ALL government messages?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/government/delete-all`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        setRecords([]);
        alert("All government messages deleted successfully.");
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete records.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
        Government Communication Records
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        View all incoming messages submitted by government agencies.
      </p>

      <button
        onClick={handleDeleteAll}
        style={{
          backgroundColor: "#d32f2f",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Delete All Messages
      </button>

      {loading && <p>Loading records...</p>}

      {!loading && records.length === 0 && (
        <p>No government messages found.</p>
      )}

      {!loading && records.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {records.map((rec) => (
            <div
              key={rec.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>{rec.organization}</h3>

              <p>
                <strong>Department:</strong> {rec.department || "N/A"}
              </p>

              <p>
                <strong>Contact:</strong> {rec.contactName}
              </p>

              <p>
                <strong>Email:</strong> {rec.email}
              </p>

              <p>
                <strong>Phone:</strong> {rec.phone || "N/A"}
              </p>

              <p>
                <strong>Country:</strong> {rec.country || "N/A"}
              </p>

              <p>
                <strong>Priority:</strong> {rec.priority}
              </p>

              <p style={{ marginTop: "10px" }}>
                <strong>Message:</strong>
                <br />
                {rec.message}
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                Submitted: {new Date(rec.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}