// lib/api/receipts.js

// Use your Render backend URL from .env
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getReceipts(userId) {
  try {
    const res = await fetch(`${BASE_URL}/receipts/list?user_id=${userId}`);
    const data = await res.json();
    return data.receipts || [];
  } catch (err) {
    console.error("Failed to fetch receipts:", err);
    return [];
  }
}

export async function getReceipt(receiptId) {
  try {
    const res = await fetch(`${BASE_URL}/receipts/${receiptId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch receipt:", err);
    return null;
  }
}
