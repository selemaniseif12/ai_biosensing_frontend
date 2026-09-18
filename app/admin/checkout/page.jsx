"use client";

import React, { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const user_id = 1; // Replace with real user ID from your auth system

  // -----------------------------
  // Fetch cart items for checkout
  // -----------------------------
  const fetchCart = async () => {
    setLoading(true);

    const res = await fetch(`http://127.0.0.1:8000/store/cart?user_id=${user_id}`);
    const data = await res.json();

    setItems(data);

    const sum = data.reduce(
      (acc, item) => acc + item.price_usd * item.quantity,
      0
    );

    setTotal(sum);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // -----------------------------
  // Checkout request
  // -----------------------------
  const handleCheckout = async () => {
    const res = await fetch("http://127.0.0.1:8000/store/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id })
    });

    const data = await res.json();

    alert(`Checkout started. Total: $${data.total_usd}`);

    // If you later add Stripe Checkout:
    // window.location.href = data.stripe_url;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {loading && <p>Loading checkout...</p>}

      {!loading && items.length === 0 && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg bg-white shadow-sm flex justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.item_name}</h2>
              <p className="text-gray-600">{item.item_type}</p>
              <p className="font-bold mt-2">
                ${item.price_usd} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm & Pay
          </button>
        </div>
      )}
    </div>
  );
}
