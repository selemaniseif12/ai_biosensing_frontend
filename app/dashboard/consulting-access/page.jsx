"use client";

import ConsultingAccessButton from "../components/ConsultingAccessButton.jsx";

export default function ConsultingAccessPage() {
  const userId = 1; // Replace with your real logged-in user ID

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Consulting Services Access</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="fixed" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="custom" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="calendar" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="payment" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="history" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="page" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <ConsultingAccessButton consultingService="admin" userId={userId} />
      </div>

      <p style={{ marginTop: "2rem", color: "#666" }}>
        Click any button above to validate your token and access the consulting service.
      </p>
    </div>
  );
}
