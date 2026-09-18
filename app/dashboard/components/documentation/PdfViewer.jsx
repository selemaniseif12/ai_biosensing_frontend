"use client";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { useState } from "react";
import { Document, Page } from "react-pdf";

export default function PdfViewer({ doc }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  if (!doc) {
    return (
      <div className="p-4 text-gray-600">
        Select a document from the list to view it.
      </div>
    );
  }

  // ⭐ FIXED: Use the Render API URL passed from DocumentationList
  const pdfUrl = doc.url;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{doc.title}</h2>

      <div className="border p-4 rounded bg-white shadow">

        <div className="flex gap-4 mb-4">
          <a
            href={pdfUrl}
            download={doc.filename || `${doc.name}.pdf`}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Download PDF
          </a>

          <button
            onClick={() => window.open(pdfUrl, "_blank")}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Print PDF
          </button>
        </div>

        <Document
          file={{ url: pdfUrl, crossOrigin: "anonymous" }}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => console.error("PDF load error:", err)}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <div className="flex items-center justify-between mt-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>

          <span>
            Page {pageNumber} of {numPages}
          </span>

          <button
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
