"use client";

export default function AdminCoursesList({ course, onOpenOutline }) {
  // Validate course object
  const isValidCourse =
    course &&
    typeof course === "object" &&
    !Array.isArray(course) &&
    course.title &&
    course.description;

  if (!isValidCourse) {
    return <p>No course found or invalid course data.</p>;
  }

  // Ensure modules is always an array
  const modules = Array.isArray(course.modules) ? course.modules : [];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Admin Courses</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Price:</strong> ${course.price}</p>
        <p><strong>Status:</strong> {course.status}</p>

        <p><strong>Modules:</strong> {modules.length}</p>

        <button
          onClick={() => onOpenOutline(course.id)}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit Course Outline
        </button>
      </div>
    </div>
  );
}
