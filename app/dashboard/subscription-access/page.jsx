"use client";

import SubscriptionAccessButton from "../components/SubscriptionAccessButton.jsx";

export default function SubscriptionAccessPage() {
  const userId = 1; // Replace with your real logged-in user ID

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Subscription Services Access</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <SubscriptionAccessButton subscriptionType="monthly" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <SubscriptionAccessButton subscriptionType="yearly" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <SubscriptionAccessButton subscriptionType="premium" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <SubscriptionAccessButton subscriptionType="enterprise" userId={userId} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <SubscriptionAccessButton subscriptionType="student" userId={userId} />
      </div>

      <p style={{ marginTop: "2rem", color: "#666" }}>
        Click any button above to validate your token and access your subscription tier.
      </p>
    </div>
  );
}
