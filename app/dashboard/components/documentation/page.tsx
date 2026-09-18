"use client";

import { useState } from "react";
import DocumentationList from "./components/DocumentationList";
import PdfViewer from "./components/PdfViewer";

export default function DocumentationPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Left side: List of documents */}
      <div className="w-1/3 border-r overflow-y-auto">
        <DocumentationList onSelect={setSelectedDoc} />
      </div>

      {/* Right side: PDF viewer */}
      <div className="flex-1 overflow-y-auto">
        {selectedDoc ? (
          <PdfViewer fileUrl={selectedDoc.url} />
        ) : (
          <div className="p-6 text-gray-600">
            Select a document from the list to view it.
          </div>
        )}
      </div>
    </div>
  );
}
