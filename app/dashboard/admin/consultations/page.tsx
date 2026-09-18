"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function AdminConsultationCalendar() {
  const [consultations, setConsultations] = useState([]);
  const [students, setStudents] = useState([]);
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

  const fetchData = async () => {
    setLoading(true);

    const consultationsData = await safeFetch(`${API}/consultations`);
    const studentsData = await safeFetch(`${API}/students`);

    setConsultations(consultationsData);
    setStudents(studentsData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading calendar...</p>;

  const events = consultations.map((c) => ({
    id: c.id,
    title:
      students.find((s) => s.id === c.student_id)?.name ??
      "Unknown Student",
    start: c.datetime,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Consultation Calendar</h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Filter by Student</label>
        <select className="border p-2 rounded w-full">
          <option value="">All</option>

          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name ?? "Unnamed Student"}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </div>
    </div>
  );
}
