"use client";

import CourseAccessButton from "./components/CourseAccessButton.jsx";

export default function DashboardPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Dashboard</h1>

      {/* Direct link to course access */}
      <CourseAccessButton courseId={1} />

      <p style={{ marginTop: "2rem", color: "#666" }}>
        Use the button above to validate your token and access course #1.
      </p>
    </div>
  );
}
