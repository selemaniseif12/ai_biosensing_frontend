"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL + "/store";
const USER_ID = 1;

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadReceipts() {
    try {
      const res = await fetch(`${API}/receipts?user_id=${USER_ID}`);
      const data = await res.json();
      setReceipts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load receipts:", err);
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReceipts();
  }, []);

  if (loading) return <div className="p-6">Loading receipts...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Receipts History</h1>

      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="border p-4 rounded shadow bg-white hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                alert(
                  `Receipt #${receipt.id}\nTotal: $${receipt.total_usd}\nDate: ${new Date(
                    receipt.created_at
                  ).toLocaleString()}`
                )
              }
            >
              <h2 className="text-lg font-semibold">Receipt #{receipt.id}</h2>
              <p>Total: ${receipt.total_usd}</p>
              <p>Date: {new Date(receipt.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
