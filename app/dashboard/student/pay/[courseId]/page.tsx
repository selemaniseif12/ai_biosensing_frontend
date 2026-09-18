"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursePaymentPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/course/${courseId}`);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Failed to load course:", err);
      }
    }

    loadCourse();
  }, [courseId]);

  async function payNow() {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/payments/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,               // Replace with real user ID later
          course_id: Number(courseId),
          price: Number(course.price)
        })
      });

      const data = await res.json();

      if (!data.checkout_url) {
        alert("Payment failed: No checkout URL returned.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.checkout_url;

    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Check console.");
      setLoading(false);
    }
  }

  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Course Payment</h1>

      <p><strong>Course ID:</strong> {courseId}</p>
      <p><strong>Price:</strong> ${course.price}</p>

      <button
        onClick={payNow}
        disabled={loading}
        style={{
          padding: "10px 16px",
          background: loading ? "gray" : "blue",
          color: "white",
          borderRadius: "6px",
          marginTop: "20px",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
