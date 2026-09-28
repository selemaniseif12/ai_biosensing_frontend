"use client";

import { useEffect, useState } from "react";

export default function DocumentationDashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        const backendDocs = Array.isArray(data) ? data : [];
        setDocuments(backendDocs);
      } catch (err) {
        console.error("Failed to load documents:", err);
        setDocuments([]);
      }
    }

    loadDocs();
  }, []);

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

      {/* ⭐ REPLACED OVERVIEW BOX WITH FULL INTRODUCTION */}
      <section
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          backgroundColor: "#fafafa",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Piezo Pico to Femtotechnology Sensors Inc
        </h2>

        <p className="mb-4">
          Piezo Pico to Femtotechnology Sensors Inc is a modern engineering company
          specializing in full‑stack API development, advanced machine learning
          integrations, and biosensing technology platforms. Our work spans multiple
          domains — from ML model deployment to financial‑grade authentication systems —
          and every document in this dashboard represents real, production‑ready
          engineering completed by our team.
        </p>

        <p className="mb-4">
          This documentation collection demonstrates our capability to design and
          implement end‑to‑end API ecosystems, including backend architecture, frontend
          integration, ML model routing, biosensing pipelines, and secure authentication
          frameworks. Each document highlights a different part of our engineering stack:
        </p>

        <ul className="list-disc ml-6 mb-4">
          <li>Architecture documents show how backend and frontend systems communicate.</li>
          <li>Platform documents explain biosensing workflows and data pipelines.</li>
          <li>Machine Learning documents detail model structure, routing, and deployment.</li>
          <li>Course and training documents outline our full‑stack API engineering curriculum.</li>
          <li>
            System architecture documents (including authentication and token systems)
            demonstrate our ability to build secure, scalable, enterprise‑grade access
            control mechanisms.
          </li>
        </ul>

        <p className="mb-4">
          Together, these documents provide a transparent view of our engineering
          standards, coding practices, and architectural design philosophy. They show
          that Piezo Pico to Femtotechnology Sensors Inc can build any modern API
          system, from ML‑powered research tools to financial‑institution‑level
          authentication systems, using sophisticated, reliable, and scalable
          technologies.
        </p>

        <p>
          Use the document list on the left to explore documents by category. You may
          open, download, or print any document directly from this dashboard.
        </p>
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
