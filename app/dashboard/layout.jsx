"use client";

import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Sidebar Section */}
      <div
        style={{
          width: "260px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          padding: "0",
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
