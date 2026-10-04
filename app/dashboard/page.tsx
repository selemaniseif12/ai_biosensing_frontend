"use client";

import { useState } from "react";
import CourseAccessButton from "./components/CourseAccessButton";
import VirusAccessButton from "./components/VirusAccessButton";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("course_access");
  const [token, setToken] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Biosensing Dashboard</h1>

      {/* TOKEN INPUT */}
      <div style={{ marginBottom: "20px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          placeholder="Paste your token here"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>

      {/* TABS */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("course_access")}>Course Access</button>
        <button onClick={() => setActiveTab("virus_access")} style={{ marginLeft: "10px" }}>
          Virus Access
        </button>
      </div>

      {/* COURSE ACCESS */}
      {activeTab === "course_access" && <CourseAccessButton />}

      {/* VIRUS ACCESS */}
      {activeTab === "virus_access" && <VirusAccessButton userId="1" token={token} />}
    </div>
  );
}
