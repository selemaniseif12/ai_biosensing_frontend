"use client";

import PdfViewer from "./components/PdfViewer";
import DocumentationList from "./components/DocumentationList";

export default function DocumentationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Documentation</h1>

      <DocumentationList />

      <div className="mt-6">
        <PdfViewer />
      </div>
    </div>
  );
}
