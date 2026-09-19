// services/outline.ts

// Use your Render backend URL from .env (Next.js syntax)
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL in environment variables.");
}

export async function getOutline(courseId: number) {
  const res = await fetch(`${API_URL}/outline/${courseId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch outline for course ${courseId}`);
  }

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

  if (!res.ok) {
    throw new Error("Failed to add outline item");
  }

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

  if (!res.ok) {
    throw new Error("Failed to delete lesson");
  }

  return res.json();
}
