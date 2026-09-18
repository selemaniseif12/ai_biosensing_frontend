// services/outline.ts

// Use your Render backend URL from .env
const API_URL = import.meta.env.VITE_API_URL;

export async function getOutline(courseId: number) {
  const res = await fetch(`${API_URL}/outline/${courseId}`);
  return res.json();
}

export async function addOutlineItem(data: {
  course_id: number;
  module_title: string;
  lesson_title: string;
  video_url?: string;
  slides_urls?: string[];
}) {
  const res = await fetch(`${API_URL}/outline/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteLesson(
  courseId: number,
  moduleTitle: string,
  lessonTitle: string
) {
  const res = await fetch(
    `${API_URL}/outline/${courseId}/delete?module_title=${moduleTitle}&lesson_title=${lessonTitle}`,
    { method: "DELETE" }
  );
  return res.json();
}
