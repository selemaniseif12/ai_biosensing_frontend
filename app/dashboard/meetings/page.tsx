"use client";

import { useEffect, useState } from "react";

export default function MeetingsDashboard() {
  // FIX: Proper typing for arrays
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const safeFetch = async (url: string) => {
    try {
      const res = await fetch(url);

      if (!res || !res.ok) {
        console.error("Fetch failed:", url, res?.status);
        return [];
      }

      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Network error:", url, err);
      return [];
    }
  };

  const fetchMeetings = async () => {
    setLoading(true);

    const meetingsData = await safeFetch(`${API}/meetings`);
    setMeetings(meetingsData);

    setLoading(false);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (loading) return <p className="p-6">Loading meetings...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "20px" }}>Meetings</h1>

      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {meetings.map((m) => (
            <div
              key={m.id}   {/* FIX: Now valid because meetings is typed */}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#fafafa",
              }}
            >
              <h2 style={{ marginBottom: "8px" }}>{m.title}</h2>

              <p>
                <strong>Date:</strong>{" "}
                {m.datetime ? new Date(m.datetime).toLocaleString() : "N/A"}
              </p>

              <p>
                <strong>Platform:</strong> {m.platform ?? "N/A"}
              </p>

              <p>
                <strong>Link:</strong>{" "}
                <a
                  href={m.meeting_link}
                  target="_blank"
                  style={{ color: "#0057b8", textDecoration: "underline" }}
                >
                  {m.meeting_link}
                </a>
              </p>

              <p>
                <strong>Status:</strong> {m.status ?? "N/A"}
              </p>

              <p>
                <strong>Notes:</strong> {m.notes || "No notes"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
