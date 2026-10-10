"use client";

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

export default function AdminSystemPage() {
  const SafeAdminGuard = AdminGuard as any;

  return (
    <SafeAdminGuard>
      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "red", fontSize: "32px" }}>
          ADMIN-SYSTEM PAGE LOADED
        </h1>

        <h2>Admin & System</h2>

        <StudentDashboard />
        <AdminDashboard />
        <PublicDashboard />
        <AdminTokenDashboard />

        <StoreAccessButton
          itemId="store-access"
          serviceName="Store Access"
          userId="admin"
        />

        <CourseContentDashboard />
        <CourseDashboard />

        <GovernmentAdminViewer />

        <ConsultingDashboard />
        <ConsultingAccessButton
          consultingService="Consulting"
          userId="admin"
        />
        <ConsultingPaymentHistory />

        <PaymentPage />
      </div>
    </SafeAdminGuard>
  );
}