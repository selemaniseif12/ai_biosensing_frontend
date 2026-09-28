"use client";

import React, { useState } from "react";
import DocumentationIntro from "./DocumentationIntro"; // ⭐ IMPORT INTRO

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

      {/* ⭐ RESTORED INTRODUCTION SECTION */}
      <DocumentationIntro />

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
