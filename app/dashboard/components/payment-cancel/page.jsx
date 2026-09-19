"use client";
export default function PaymentCancel() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "#dc3545" }}>Payment Canceled</h1>
      <p>Your payment was not completed.</p>
      <p>You may try again at any time.</p>

      <a
        href="/dashboard"
        style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Return to Dashboard
      </a>
    </div>
  );
}
