"use client";

import { useEffect, useState } from "react";

export default function ConsultingPaymentHistory() {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with real logged‑in user ID
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:8000/receipts/list?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setReceipts(data.receipts || []);
        setLoading(false);
      })
      .catch(() => {
        setReceipts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Payment History</h1>

      {loading && <p>Loading payment history...</p>}

      {!loading && receipts.length === 0 && (
        <p style={{ color: "gray" }}>No receipts found.</p>
      )}

      {!loading && receipts.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={cellStyle}>Receipt ID</th>
              <th style={cellStyle}>Service</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Date</th>
            </tr>
          </thead>

          <tbody>
            {receipts.map((r) => (
              <tr
                key={r.receipt_id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedReceipt(r)}
              >
                <td style={cellStyle}>{r.receipt_id}</td>
                <td style={cellStyle}>{r.service_name}</td>
                <td style={cellStyle}>${r.amount_paid}</td>
                <td style={cellStyle}>{new Date(r.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Receipt viewer */}
      {selectedReceipt && (
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "20px" }}>Receipt Details</h2>

          <div
            style={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              marginBottom: "12px",
            }}
          >
            <p><strong>Receipt ID:</strong> {selectedReceipt.receipt_id}</p>
            <p><strong>Service:</strong> {selectedReceipt.service_name}</p>
            <p><strong>Amount Paid:</strong> ${selectedReceipt.amount_paid}</p>
            <p><strong>Date:</strong> {new Date(selectedReceipt.date).toLocaleString()}</p>

            {selectedReceipt.items && (
              <div style={{ marginTop: "10px" }}>
                <strong>Items:</strong>
                <ul>
                  {selectedReceipt.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};
