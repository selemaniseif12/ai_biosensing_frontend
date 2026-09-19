"use client";
export default function DocumentationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Documentation</h1>

      <div className="mt-6">
        <iframe
          src="/documentation.pdf"
          title="Documentation PDF"
          className="h-[calc(100vh-12rem)] w-full rounded border"
        />
      </div>
    </div>
  );
}
