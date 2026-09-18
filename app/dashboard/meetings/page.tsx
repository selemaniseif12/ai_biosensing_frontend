"use client";

import { useEffect, useState } from "react";

export default function MeetingsDashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/meetings");
      const data = await res.json();
      setMeetings(data.meetings || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const createMeeting = async () => {
    const res = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: "", date: "", time: "", description: "" });
      loadMeetings();
    }
  };

  const deleteMeeting = async (id) => {
    await fetch(`/api/meetings/${id}`, { method: "DELETE" });
    loadMeetings();
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Meetings Dashboard</h1>

      {/* Create Meeting */}
      <div
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Create a Meeting</h2>

        <input
          type="text"
          placeholder="Meeting Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={createMeeting}
          style={{
            padding: "10px 20px",
            background: "#0057b8",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create Meeting
        </button>
      </div>

      {/* Meetings List */}
      <h2>Upcoming Meetings</h2>

      {loading && <p>Loading meetings...</p>}

      {!loading && meetings.length === 0 && <p>No meetings scheduled yet.</p>}

      {meetings.map((m) => (
        <div
          key={m.id}
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <h3>{m.title}</h3>
          <p><strong>Date:</strong> {m.date}</p>
          <p><strong>Time:</strong> {m.time}</p>
          <p>{m.description}</p>

          <button
            onClick={() => deleteMeeting(m.id)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "red",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={loadMeetings}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#333",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Refresh
      </button>
    </div>
  );
}
