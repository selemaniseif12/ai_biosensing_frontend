"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CourseViewerPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`${API}/courses/${courseId}`);
        const data = await res.json();

        setCourse(data.course);
        setModules(Array.isArray(data.modules) ? data.modules : []);
      } catch (err) {
        console.error("Failed to load course:", err);
      }
    }

    fetchCourse();
  }, [courseId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Course: {course?.title}</h1>

      {modules.map((m) => (
        <div key={m.id} className="mb-4">
          <h2 className="text-xl font-semibold">{m.title}</h2>
          <p className="text-gray-700">{m.description}</p>
        </div>
      ))}
    </div>
  );
}
