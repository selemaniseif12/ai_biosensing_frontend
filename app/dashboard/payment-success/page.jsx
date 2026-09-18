"use client";

import { useEffect, useState } from "react";
import Receipt from "../../../components/Receipt"; // FIXED: no alias, correct relative path

export default function PaymentSuccess() {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const user_id = params.get("user_id");
    const service_name = params.get("service_name");
    const amount_paid = params.get("amount_paid");
    const transaction_id = params.get("transaction_id");

    // If Stripe didn't return required data
    if (!user_id || !service_name || !amount_paid || !transaction_id) {
      setLoading(false);
      return;
    }

    // Call backend to finalize payment
    fetch("https://ai-biosensing-backend-trial2.onrender.com/payments/success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: Number(user_id),
        service_name,
        amount_paid: Number(amount_paid),
        transaction_id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setReceipt(data.receipt);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ color: "#007bff" }}>Finalizing your payment...</h1>
        <p>Please wait while we generate your receipt.</p>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ color: "red" }}>Payment Data Missing</h1>
        <p>We could not retrieve your payment details.</p>

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

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#28a745", textAlign: "center" }}>
        Payment Completed
      </h1>

      <p style={{ textAlign: "center" }}>
        Your payment has been successfully processed.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Receipt receipt={receipt} />
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <a
          href="/dashboard"
          style={{
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
    </div>
  );
}
