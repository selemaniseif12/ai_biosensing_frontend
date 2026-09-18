// MeetingsAPI.jsx

export async function getMeetings() {
  // Use your Next.js API route instead of FastAPI
  const res = await fetch("/api/meetings");

  if (!res.ok) {
    console.error("Backend returned error:", res.status);
    return [];
  }

  const data = await res.json();

  return data.map(m => ({
    id: m.id || m.consultation_id || crypto.randomUUID(),

    // Your backend provides separate date + time fields
    date: m.date || "",
    time: m.time || "",

    // Your backend fields
    platform: m.platform || "N/A",
    link: m.meeting_link || "",

    // No title/topic in backend → create a default
    title: "Consultation Meeting",
  }));
}
