"use client";
export default function CustomersSummary({ customers }) {
  const total = customers?.length || 0;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
        background: "#f9f9f9"
      }}
    >
      <h3>Customer Summary</h3>

      <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>
        Total Customers: {total}
      </p>
    </div>
  );
}
