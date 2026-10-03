"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "edge";

/* Existing Components */
import VirusList from "./components/VirusList.jsx";

/* ML Training */
import MLTrainingV2 from "./components/MLTrainingV2.jsx";
import MLTrainingV6 from "./components/MLTrainingV6.jsx";

/* Home */
import HomePage from "./components/HomePage.jsx";

/* Profile */
import Profile from "./components/profile";

/* Consulting */
import ConsultingPage from "./components/ConsultingPage.jsx";
import ConsultingPaymentHistory from "./components/ConsultingPaymentHistory.jsx";
import ConsultationCalendar from "./components/ConsultationCalendar.jsx";

/* NEW - Consulting Meetings Dashboard */
import MeetingForm from "./components/MeetingForm.jsx";
import MeetingList from "./components/MeetingList.jsx";
import ScheduleCalendar from "./components/ScheduleCalendar.jsx";

/* Enrollment */
import EnrollmentStatus from "./components/EnrollmentStatus.jsx";

/* Course Dashboards */
import CourseDashboard from "./components/CourseDashboard.jsx";
import CourseModulesDashboard from "./components/CourseModulesDashboard.jsx";
import CourseContentDashboard from "./components/CourseContentDashboard.jsx";

/* Student/Admin/Public */
import StudentDashboard from "./components/StudentDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import PublicDashboard from "./components/PublicDashboard.jsx";

/* ML Models VCE-100 */
import VCE100V2Dashboard from "./components/VCE100V2Dashboard.jsx";
import VCE100V6Dashboard from "./components/VCE100V6Dashboard.jsx";
import VCE100CompareDashboard from "./components/VCE100CompareDashboard.jsx";

/* ML Drift */
import MlDrift from "./components/MlDrift.jsx";

/* Probability vs Flow Rate */
import VirusProbabilityFlowChart from "./components/VirusProbabilityFlowChart.jsx";

/* TOKEN-BASED ACCESS COMPONENTS */
import CourseAccessButton from "./components/CourseAccessButton.jsx";
import VirusAccessButton from "./components/VirusAccessButton.jsx";
import ConsultingAccessButton from "./components/ConsultingAccessButton.jsx";

/* Meetings API */
import { getMeetings } from "./components/MeetingAPI.jsx";

/* ⭐ ADMIN TOKEN DASHBOARD */
import AdminTokenDashboard from "./components/AdminTokenDashboard.jsx";

/* ⭐ GOVERNMENT COMPONENTS */
import GovernmentHomePage from "./components/GovernmentHomePage.jsx";
import GovernmentDashboard from "./components/GovernmentDashboard.jsx";
import GovernmentAdminViewer from "./components/GovernmentAdminViewer.jsx";

/* ⭐ FIX: Proper Meeting interface */
interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  platform: string;
  link: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [openSection, setOpenSection] = useState<string | null>("home");

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("user_id", "1");
  }, []);

  // ⭐ Load role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCreate = (meeting: any) => {
    const normalized: Meeting = {
      id: meeting.id || crypto.randomUUID(),
      title: meeting.title || "Consultation Meeting",
      date: meeting.date || "",
      time: meeting.time || "",
      platform: meeting.platform || "N/A",
      link: meeting.link || "",
    };

    setMeetings((current: Meeting[]) => [...current, normalized]);
  };

  useEffect(() => {
    getMeetings().then((data: Meeting[]) => setMeetings(data)).catch(console.error);
  }, []);

  useEffect(() => {
    const paymentStatus = params.get("payment");
    if (paymentStatus === "success") router.push("/dashboard/payment-success");
    if (paymentStatus === "cancel") router.push("/dashboard/payment-cancel");
  }, [params, router]);

  const pageStyle = {
    padding: "24px",
    maxWidth: "1300px",
    margin: "0 auto",
    minHeight: "100vh",
    lineHeight: "1.5",
  };

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    minWidth: "260px",
  };

  const buttonStyle = (isActive: boolean) => ({
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: isActive ? "#0057b8" : "#e0e0e0",
    color: isActive ? "#fff" : "#333",
    cursor: "pointer",
  });

  // ⭐ Access Denied Component
  const AccessDenied = () => (
    <div style={{ color: "red", padding: "20px" }}>
      Access Denied — You do not have permission to view this section.
    </div>
  );

  return (
    <div style={pageStyle}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

      {/* LOGOUT BUTTON */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
          }}
          style={{
            padding: "10px 16px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* TOKEN INPUT */}
      <div style={{ marginBottom: "20px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          placeholder="Enter your token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>

      {/* NAVIGATION CARDS */}
      <div
        style={{
          marginBottom: "26px",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {/* GOVERNMENT SECTION */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("government")} style={{ cursor: "pointer" }}>
            Government
          </h3>

          {openSection === "government" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              
              {/* PUBLIC */}
              <button
                onClick={() => setActiveTab("government_home")}
                style={buttonStyle(activeTab === "government_home")}
              >
                Government Home
              </button>

              <button
                onClick={() => setActiveTab("government_dashboard")}
                style={buttonStyle(activeTab === "government_dashboard")}
              >
                Government Dashboard
              </button>

              {/* ADMIN ONLY */}
              <button
                onClick={() => setActiveTab("government_admin")}
                style={buttonStyle(activeTab === "government_admin")}
              >
                Government Admin Viewer
              </button>

            </div>
          )}
        </div>

        {/* ADMIN & SYSTEM */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("admin")} style={{ cursor: "pointer" }}>
            Admin & System
          </h3>
          {openSection === "admin" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("student")}
                style={buttonStyle(activeTab === "student")}
              >
                Student
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                style={buttonStyle(activeTab === "admin")}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveTab("public")}
                style={buttonStyle(activeTab === "public")}
              >
                Public
              </button>

              <button
                onClick={() => setActiveTab("admin_tokens")}
                style={buttonStyle(activeTab === "admin_tokens")}
              >
                Admin Tokens
              </button>

              <button
                onClick={() => router.push("/dashboard/admin/store")}
                style={buttonStyle(false)}
              >
                Store
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/cart")}
                style={buttonStyle(false)}
              >
                Cart
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/checkout")}
                style={buttonStyle(false)}
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* MARKETPLACE */}
        <div style={cardStyle}>
          <h3
            onClick={() => toggleSection("marketplace")}
            style={{ cursor: "pointer", color: "#b8860b" }}
          >
            Marketplace
          </h3>

          {openSection === "marketplace" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => router.push("/dashboard/admin/store")}
                style={buttonStyle(false)}
              >
                Store
              </button>

              <button
                onClick={() => router.push("/dashboard/admin/cart")}
                style={buttonStyle(false)}
              >
                Cart
              </button>

              <button
                onClick={() => router.push("/dashboard/admin/checkout")}
                style={buttonStyle(false)}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ marginTop: "18px" }}>
        {activeTab === "home" && <HomePage />}
        {activeTab === "profile" && <Profile />}

        {/* VIRUS LIST */}
        {activeTab === "virus_list" &&
          (token ? (
            <VirusList />
          ) : (
            <div style={{ color: "red" }}>Token required</div>
          ))}

        {/* MACHINE LEARNING */}
        {activeTab === "ml_v2" && <MLTrainingV2 />}
        {activeTab === "ml_v6" && <MLTrainingV6 />}

        {/* SENSOR DEVICES */}
        {activeTab === "sensor_devices" && (
          <div style={{ padding: "20px", maxWidth: "800px" }}>
            <h2>Sensor Devices</h2>

            <img
              src="https://ai-biosensing-frontend-v2.vercel.app/device.png"
              alt="Sensor Device"
              style={{
                maxWidth: "350px",
                marginBottom: "20px",
                borderRadius: "10px",
                display: "block"
              }}
            />

            <p>
              The sensor devices demonstrated in our MLDrift simulation represent
              the foundational version of our patented low‑grade biosensing
              technology. These devices are engineered to detect analytes at
              picogram‑level sensitivity, forming the baseline capability of our
              broader Piezo‑Pico to Femtotechnology Sensors Inc. platform.
            </p>

            <p>
              All sensor devices showcased in this dashboard are proprietary
              products owned exclusively by Piezo‑Pico to Femtotechnology Sensors
              Inc. The technology, design, firmware, and biosensing mechanisms are
              protected under active intellectual property rights.
            </p>

            <p>
              Any attempt to sell, distribute, replicate, or purchase similar
              devices from unauthorized sources is strictly prohibited. Unauthorized
              reproduction, resale, or reverse engineering of our patented
              biosensing technology will be subject to legal action under applicable
              statutes.
            </p>

            <p>
              By accessing this dashboard, customers acknowledge that the sensor
              devices and associated ML simulation tools are proprietary assets of
              Piezo‑Pico to Femtotechnology Sensors Inc. All commercial transactions
              must occur through our official marketplace.
            </p>
          </div>
        )}

        {/* CONSULTING */}
        {activeTab === "consulting" &&
          (role === "consulting" || role === "admin" ? (
            <ConsultingPage />
          ) : (
            <AccessDenied />
          ))}

        {activeTab === "consulting_history" &&
          (role === "consulting" || role === "admin" ? (
            <ConsultingPaymentHistory />
          ) : (
            <AccessDenied />
          ))}

        {activeTab === "consulting_calendar" &&
          (role === "consulting" || role === "admin" ? (
            <ConsultationCalendar />
          ) : (
            <AccessDenied />
          ))}

        {/* COURSES */}
        {activeTab === "enrollment" && <EnrollmentStatus />}
        {activeTab === "course_dashboard" && <CourseDashboard />}
        {activeTab === "course_modules" && <CourseModulesDashboard />}
        {activeTab === "course_content" && <CourseContentDashboard />}

        {/* STUDENT / ADMIN / PUBLIC */}
        {activeTab === "student" &&
          (role === "student" || role === "admin" ? (
            <StudentDashboard />
          ) : (
            <AccessDenied />
          ))}

        {activeTab === "admin" &&
          (role === "admin" ? <AdminDashboard /> : <AccessDenied />)}

        {activeTab === "public" && <PublicDashboard />}

        {/* ML MODELS */}
        {activeTab === "vce100_v2" &&
          (role === "admin" ? <VCE100V2Dashboard /> : <AccessDenied />)}

        {activeTab === "vce100_v6" &&
          (role === "admin" ? <VCE100V6Dashboard /> : <AccessDenied />)}

        {activeTab === "vce100_compare" && <VCE100CompareDashboard />}

        {/* ML DRIFT */}
        {activeTab === "ml_drift" && <MlDrift />}

        {/* VIRUS PROBABILITY FLOW */}
        {activeTab === "prob_flow" && <VirusProbabilityFlowChart />}

        {/* COURSE ACCESS */}
        {activeTab === "course_access" && (
          <CourseAccessButton courseId="1" userId="1" />
        )}
        {activeTab === "virus_access" && <VirusAccessButton userId="1" token={token} />}
        {activeTab === "consulting_access" && (
          <ConsultingAccessButton consultingService={token} userId="1" />
        )}

        {/* CONSULTING MEETINGS */}
        {activeTab === "consulting_meetings" &&
          (role === "consulting" || role === "admin" ? (
            <div style={{ display: "grid", gap: "24px" }}>
              <MeetingForm onCreate={handleCreate} />
              <ScheduleCalendar meetings={meetings} />
              <MeetingList meetings={meetings} />
            </div>
          ) : (
            <AccessDenied />
          ))}

        {/* ADMIN TOKENS */}
        {activeTab === "admin_tokens" &&
          (role === "admin" ? <AdminTokenDashboard /> : <AccessDenied />)}

        {/* ⭐ GOVERNMENT ROUTES */}
        {activeTab === "government_home" && <GovernmentHomePage />}

        {activeTab === "government_dashboard" && <GovernmentDashboard />}

        {activeTab === "government_admin" &&
          (role === "admin" ? <GovernmentAdminViewer /> : <AccessDenied />)}

      </div>
    </div>
  );
}
