"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CreateConsultationPage() {
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    student_id: "",
    team_id: "",
    datetime: "",
    platform: "",
    meeting_link: "",
    notes: "",
  });

  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      setLoading(true);

      const resStudents = await fetch(`${API}/students`);
      const dataStudents = await resStudents.json();

      const resTeams = await fetch(`${API}/team`);
      const dataTeams = await resTeams.json();

      setStudents(Array.isArray(dataStudents) ? dataStudents : []);
      setTeams(Array.isArray(dataTeams) ? dataTeams : []);

    } catch (err) {
      console.error("Failed to load data:", err);
      setStudents([]);
      setTeams([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/consultations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Consultation created successfully!");
    } else {
      alert("Failed to create consultation.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Consultation</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Student Select */}
        <div>
          <label className="block font-semibold mb-2">Student</label>
          <select
            value={form.student_id}
            onChange={(e) => setForm({ ...form, student_id: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select student</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name ?? "Unnamed Student"}
              </option>
            ))}
          </select>
        </div>

        {/* Team Select */}
        <div>
          <label className="block font-semibold mb-2">Team</label>
          <select
            value={form.team_id}
            onChange={(e) => setForm({ ...form, team_id: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select team</option>

            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name ?? "Unnamed Team"}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div>
          <label className="block font-semibold mb-2">Date & Time</label>
          <input
            type="datetime-local"
            value={form.datetime}
            onChange={(e) => setForm({ ...form, datetime: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Platform */}
        <div>
          <label className="block font-semibold mb-2">Platform</label>
          <input
            type="text"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="Zoom, Google Meet, Teams..."
          />
        </div>

        {/* Meeting Link */}
        <div>
          <label className="block font-semibold mb-2">Meeting Link</label>
          <input
            type="text"
            value={form.meeting_link}
            onChange={(e) => setForm({ ...form, meeting_link: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="https://..."
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block font-semibold mb-2">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Consultation
        </button>
      </form>
    </div>
  );
}
