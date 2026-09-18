"use client";

import { useEffect, useState } from "react";

// Existing virus component
import VirusList from "./components/VirusList";

// Consulting Meeting Components (JSX but default export = OK)
import MeetingForm from "./components/MeetingForm";
import MeetingList from "./components/MeetingList";
import ScheduleCalendar from "./components/ScheduleCalendar";

// API functions
import {
  createMeeting,
  assignTeam,
  getMeetings,
  sendEmail
} from "./components/MeetingAPI";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [viruses, setViruses] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);

  // Load virus list
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/virus/list", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setViruses)
      .catch(err => console.error("Error loading virus list:", err));
  }, []);

  // Load meetings
  useEffect(() => {
    getMeetings()
      .then(setMeetings)
      .catch(err => console.error("Error loading meetings:", err));
  }, []);

  // Create meeting handler
  const handleCreate = async (form: any) => {
    try {
      const meeting = await createMeeting({
        id: 1, // temporary ID until you wire real consultation ID
        ...form
      });

      // Optional: assign team automatically
      await assignTeam(meeting.id, 1);

      // Send email automatically
      await sendEmail(
        form.participants,
        `Meeting Invitation: ${form.title}`,
        `You have a meeting on ${form.date} at ${form.time}.`
      );

      // Reload meetings
      const updated = await getMeetings();
      setMeetings(updated);

      alert("Meeting created and email sent.");
    } catch (err) {
      console.error("Error creating meeting:", err);
      alert("Error creating meeting.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("virus")}>Virus Tools</button>
        <button onClick={() => setActiveTab("consulting_meetings")}>
          Consulting Meetings
        </button>
      </div>

      {/* HOME */}
      {activeTab === "home" && (
        <div>
          <h2>Welcome to your Dashboard</h2>
          <p>Select a section above.</p>
        </div>
      )}

      {/* VIRUS LIST */}
      {activeTab === "virus" && (
        <div>
          <h2>Virus List</h2>
          <VirusList viruses={viruses} />
        </div>
      )}

      {/* CONSULTING MEETINGS */}
      {activeTab === "consulting_meetings" && (
        <div>
          <h2>Consulting Meetings</h2>

          <MeetingForm onCreate={handleCreate} />

          <h3>Upcoming Meetings</h3>
          <MeetingList meetings={meetings} />

          <h3>Calendar</h3>
          <ScheduleCalendar meetings={meetings} />
        </div>
      )}
    </div>
  );
}
