import React from "react";

export default function CoursePaymentSuccess({ params }) {
  const { courseId } = params;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "#28a745" }}>Course Payment Completed</h1>

      <p>Your payment for <strong>Course #{courseId}</strong> has been successfully processed.</p>
      <p>You now have full access to the course materials.</p>

      <a
        href={`/dashboard/student/pay/${courseId}`}
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
        Return to Course Page
      </a>
    </div>
  );
}
