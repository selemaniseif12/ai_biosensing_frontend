"use client";

import CourseAccessButton from "../components/CourseAccessButton.jsx";

export default function CourseAccessPage() {
  const courseId = 1; // Example course

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Course Access</h1>

      {/* FIXED: removed userId */}
      <CourseAccessButton courseId={courseId} />

      <p style={{ marginTop: "2rem", color: "#666" }}>
        Click the button above to validate your token and access course #{courseId}.
      </p>
    </div>
  );
}
