"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function AdminConsultationCalendar() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);

  const [platform, setPlatform] = useState("");
  const [studentId, setStudentId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [status, setStatus] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ⭐ Safe fetch helper
  const safeFetch = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Fetch failed:", url, res.status);
        return [];
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Network error:", url, err);
      return [];
    }
  };

  // ⭐ Fetch consultations with filters
  const fetchConsultations = async () => {
    const params = new URLSearchParams({
      platform,
      student_id: studentId,
      team_id: teamId,
      status,
    });

    const res = await fetch(`${API}/consultations?${params}`);
    const data = await res.json();

    const items = Array.isArray(data.items) ? data.items : [];

    const events = items.map((c: any) => ({
      id: c.id,
      title: `${c.student_name} (${c.platform})`,
      start: c.datetime,
      backgroundColor:
        c.platform === "zoom"
          ? "#2563eb"
          : c.platform === "google"
          ? "#22c55e"
          : c.platform === "teams"
          ? "#9333ea"
          : "#f97316",
      borderColor: "#00000020",
    }));

    setConsultations(events);
  };

  // ⭐ Initial load
  useEffect(() => {
    safeFetch(`${API}/students`).then(setStudents);
    safeFetch(`${API}/teams`).then(setTeam);
    fetchConsultations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Consultation Calendar</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Platform */}
        <div>
          <label className="block mb-2 font-semibold">Platform</label>
          <select
            className="w-full p-2 border rounded"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">All</option>
            <option value="zoom">Zoom</option>
            <option value="google">Google Meet</option>
            <option value="teams">Microsoft Teams</option>
            <option value="outlook">Outlook Meeting</option>
          </select>
        </div>

        {/* Students */}
        <div>
          <label className="block mb-2 font-semibold">Student</label>
          <select
            className="w-full p-2 border rounded"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">All</option>
            {students.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Team */}
        <div>
          <label className="block mb-2 font-semibold">Team Member</label>
          <select
            className="w-full p-2 border rounded"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
          >
            <option value="">All</option>
            {team.map((t: any) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-semibold">Status</label>
          <select
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <button
        onClick={fetchConsultations}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
      >
        Apply Filters
      </button>

      <div className="bg-white p-4 rounded shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={consultations}
          height="auto"
          eventClick={(info: any) => {
            window.location.href = `/admin/consultations/${info.event.id}`;
          }}
        />
      </div>
    </div>
  );
}
