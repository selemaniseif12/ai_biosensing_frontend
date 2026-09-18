"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentDashboardPage() {
  const [available, setAvailable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        // FIXED: correct backend endpoint
        const res = await fetch("http://127.0.0.1:8000/course/");
        const data = await res.json();

        setAvailable(data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      }

      setLoading(false);
    }

    loadCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Dashboard</h1>

      <h2>Available Courses</h2>

      {available.length === 0 && <p>No courses available.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {available.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <h3>{course.title}</h3>

            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Status:</strong> {course.status}</p>

            <Link
              href={`/dashboard/student/pay/${course.id}`}
              style={{
                marginTop: "12px",
                display: "inline-block",
                padding: "8px 12px",
                background: "#0070f3",
                color: "white",
                borderRadius: "6px",
              }}
            >
              View / Buy Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
