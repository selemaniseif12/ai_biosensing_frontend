"use client";

import { useEffect, useState } from "react";

export default function DocumentationDashboard() {
  const [documents, setDocuments] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // ⭐ Fetch the 11 documents from your Render backend
  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch(
          "https://ai-biosensing-backend-trial2.onrender.com/docs/list",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await res.json();

        // Ensure array format
        const backendDocs = Array.isArray(data) ? data : [];

        setDocuments(backendDocs);
      } catch (err) {
        console.error("Failed to load documents:", err);
        setDocuments([]);
      }
    }

    loadDocs();
  }, []);

  // ⭐ Loading state
  if (documents.length === 0) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>Documentation</h1>
        <p>Loading documents...</p>
      </div>
    );
  }

  const selectedDoc = documents[selectedIndex];

  const goPrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const goNext = () => {
    if (selectedIndex < documents.length - 1)
      setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Documentation</h1>

      <section
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          backgroundColor: "#fafafa",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>Overview of All Documents</h2>
        <p style={{ marginBottom: "12px" }}>
          This page explains what each document in the biosensing platform
          covers. Use it as a map before diving into individual PDFs.
        </p>

        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          {documents.map((doc) => (
            <li key={doc.id} style={{ marginBottom: "8px" }}>
              <strong>{doc.title}:</strong> {doc.category}
            </li>
          ))}
        </ul>
      </section>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Sidebar list */}
        <div
          style={{
            width: "300px",
            backgroundColor: "#f5f5f5",
            padding: "16px",
            borderRadius: "10px",
            overflowY: "auto",
            maxHeight: "600px",
          }}
        >
          <h3>Documents</h3>

          {documents.map((doc, index) => (
            <div
              key={doc.id}
              onClick={() => setSelectedIndex(index)}
              style={{
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor:
                  index === selectedIndex ? "#0057b8" : "#e0e0e0",
                color: index === selectedIndex ? "#fff" : "#333",
              }}
            >
              {doc.title}
            </div>
          ))}
        </div>

        {/* PDF Viewer */}
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button onClick={goPrev} disabled={selectedIndex === 0}>
              ⬆ Previous
            </button>

            <h3>{selectedDoc.title}</h3>

            <button
              onClick={goNext}
              disabled={selectedIndex === documents.length - 1}
            >
              ⬇ Next
            </button>
          </div>

          <iframe
            src={`https://ai-biosensing-backend-trial2.onrender.com/docs/${selectedDoc.name}`}
            style={{
              width: "100%",
              height: "600px",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
