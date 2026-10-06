"use client";

import AdminGuard from "@/components/AdminGuard";

import StudentDashboard from "@/components/StudentDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import PublicDashboard from "@/components/PublicDashboard";
import AdminTokensDashboard from "@/components/AdminTokensDashboard";

import StoreDashboard from "@/components/StoreDashboard";
import CartDashboard from "@/components/CartDashboard";
import CheckoutDashboard from "@/components/CheckoutDashboard";

import CourseContent from "@/components/CourseContent";
import CourseDashboard from "@/components/CourseDashboard";

import GovernmentAdminViewer from "@/components/GovernmentAdminViewer";

import ConsultingHistory from "@/components/ConsultingHistory";
import ConsultingMeetings from "@/components/ConsultingMeetings";
import ConsultingAccess from "@/components/ConsultingAccess";

import PaymentHistory from "@/components/PaymentHistory";

export default function AdminSystemPage() {
  return (
    <AdminGuard>
      <div style={{ padding: "20px" }}>
        <h1>Admin & System</h1>

        <StudentDashboard />
        <AdminDashboard />
        <PublicDashboard />
        <AdminTokensDashboard />

        <StoreDashboard />
        <CartDashboard />
        <CheckoutDashboard />

        <CourseContent />
        <CourseDashboard />

        <GovernmentAdminViewer />

        <ConsultingHistory />
        <ConsultingMeetings />
        <ConsultingAccess />

        <PaymentHistory />
      </div>
    </AdminGuard>
  );
}
