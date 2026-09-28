"use client";

import React, { useState } from "react";

export default function DocumentationPage() {
  const [filter, setFilter] = useState("");

  const documents = [
    { name: "backend_frontend_architecture_docs", category: "General" },
    { name: "biosensing_platform_docs", category: "General" },
    { name: "course_outline_fullstack_api_engineering_docs", category: "General" },
    { name: "general_auth_token_access_system", category: "General" },
    { name: "main_py_documentation_docs", category: "General" },
    { name: "ml_models_folder_structure_docs", category: "General" },
    { name: "payment_system_architecture_docs", category: "General" },
    { name: "router_documentation_docs", category: "General" },
    { name: "swagger_documentation_docs", category: "General" },
    { name: "token_based_access_system", category: "General" },
    { name: "updated_swagger_public", category: "General" }
  ];

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* ⭐ HARD‑CODED INTRODUCTION SECTION */}
      <div className="p-4 mb-6 border-b pb-6">
        <h1 className="text-2xl font-bold mb-4">
          Piezo Pico to Femtotechnology Sensors Inc
        </h1>

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
          Use the filter panel below to explore documents by category. You may
          open, download, or print any document directly from this dashboard.
        </p>
      </div>

      {/* ⭐ Filter Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search documents..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* ⭐ Documents List */}
      <h2 className="text-xl font-bold mb-4">Available Documents</h2>

      <div className="space-y-3">
        {filteredDocs.map((doc, idx) => (
          <div
            key={idx}
            className="border p-4 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <div className="font-semibold">{doc.name}</div>
            <div className="text-sm text-gray-600">{doc.category}</div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="text-gray-500">No documents match your search.</div>
        )}
      </div>
    </div>
  );
}
