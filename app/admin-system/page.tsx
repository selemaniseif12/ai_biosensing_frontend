"use client";

import { useState } from "react";
import AdminGuard from "@/app/dashboard/components/AdminGuard";

import StudentDashboard from "@/app/dashboard/components/StudentDashboard";
import AdminDashboard from "@/app/dashboard/components/AdminDashboard";
import PublicDashboard from "@/app/dashboard/components/PublicDashboard";
import AdminTokenDashboard from "@/app/dashboard/components/AdminTokenDashboard";

import StoreAccessButton from "@/app/dashboard/components/StoreAccessButton";

import CourseContentDashboard from "@/app/dashboard/components/CourseContentDashboard";
import CourseDashboard from "@/app/dashboard/components/CourseDashboard";

import GovernmentAdminViewer from "@/app/dashboard/components/GovernmentAdminViewer";

import ConsultingDashboard from "@/app/dashboard/components/ConsultingPage";
import ConsultingAccessButton from "@/app/dashboard/components/ConsultingAccessButton";
import ConsultingPaymentHistory from "@/app/dashboard/components/ConsultingPaymentHistory";

import PaymentPage from "@/app/dashboard/components/PaymentPage";

type SectionName =
  | "users"
  | "courses"
  | "government"
  | "consulting"
  | "payments"
  | "store";

export default function AdminSystemPage() {
  const [activeSection, setActiveSection] =
    useState<SectionName>("users");

  const sectionButtonStyle = (section: SectionName) => ({
    padding: "12px 18px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer" as const,
    background: activeSection === section ? "#17365d" : "#f3f4f6",
    color: activeSection === section ? "#fff" : "#222",
    fontWeight: 600,
  });

  return (
    <AdminGuard>
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
          color: "#222",
        }}
      >
        <header style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "30px", marginBottom: "8px" }}>
            Admin &amp; System
          </h1>

          <p>
            Manage users, courses, consulting services, payments, and system
            access.
          </p>
        </header>

        <nav
          aria-label="Administrator sections"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <button
            type="button"
            style={sectionButtonStyle("users")}
            onClick={() => setActiveSection("users")}
          >
            Users &amp; Access
          </button>

          <button
            type="button"
            style={sectionButtonStyle("courses")}
            onClick={() => setActiveSection("courses")}
          >
            Courses
          </button>

          <button
            type="button"
            style={sectionButtonStyle("government")}
            onClick={() => setActiveSection("government")}
          >
            Government
          </button>

          <button
            type="button"
            style={sectionButtonStyle("consulting")}
            onClick={() => setActiveSection("consulting")}
          >
            Consulting
          </button>

          <button
            type="button"
            style={sectionButtonStyle("payments")}
            onClick={() => setActiveSection("payments")}
          >
            Payments
          </button>

          <button
            type="button"
            style={sectionButtonStyle("store")}
            onClick={() => setActiveSection("store")}
          >
            Store
          </button>
        </nav>

        <section>
          {activeSection === "users" && (
            <div style={{ display: "grid", gap: "24px" }}>
              <h2>Users &amp; Access</h2>
              <StudentDashboard />
              <AdminDashboard />
              <PublicDashboard />
              <AdminTokenDashboard />
            </div>
          )}

          {activeSection === "courses" && (
            <div style={{ display: "grid", gap: "24px" }}>
              <h2>Course Management</h2>
              <CourseContentDashboard />
              <CourseDashboard />
            </div>
          )}

          {activeSection === "government" && (
            <div style={{ display: "grid", gap: "24px" }}>
              <h2>Government Administration</h2>
              <GovernmentAdminViewer />
            </div>
          )}

          {activeSection === "consulting" && (
            <div style={{ display: "grid", gap: "24px" }}>
              <h2>Consulting Management</h2>
              <ConsultingDashboard />

              <ConsultingAccessButton
                consultingService="Consulting"
                userId="admin"
              />

              <ConsultingPaymentHistory />
            </div>
          )}

          {activeSection === "payments" && (
            <div style={{ display: "grid", gap: "24px" }}>
              <h2>Payment Management</h2>
              <PaymentPage />
            </div>
          )}

          {activeSection === "store" && (
            <div style={{ display: "grid", gap: "24px" }}>
              <h2>Store Management</h2>

              <StoreAccessButton
                itemId="store-access"
                serviceName="Store Access"
                userId="admin"
              />
            </div>
          )}
        </section>
      </main>
    </AdminGuard>
  );
}