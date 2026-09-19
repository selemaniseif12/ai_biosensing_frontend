"use client";
export default function PdfViewer({ fileUrl }) {
  if (!fileUrl) {
    return (
      <div className="p-4 text-gray-600">
        No document selected.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe
        src={fileUrl}
        className="w-full h-screen"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
}
