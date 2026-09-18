"use client";

import StoreAccessButton from "../components/StoreAccessButton.jsx";

export default function StoreAccessPage() {
  const userId = 1; // Replace with your real logged-in user ID

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Store Item Access</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <StoreAccessButton
          itemId="course_1"
          serviceName="course_1"
          userId={userId}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <StoreAccessButton
          itemId="ml_model_v2"
          serviceName="ml_model_v2"
          userId={userId}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <StoreAccessButton
          itemId="consulting_fixed"
          serviceName="consulting_fixed"
          userId={userId}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <StoreAccessButton
          itemId="virus_list"
          serviceName="virus_list"
          userId={userId}
        />
      </div>

      <p style={{ marginTop: "2rem", color: "#666" }}>
        Click any button above to validate your token and access the purchased store item.
      </p>
    </div>
  );
}
