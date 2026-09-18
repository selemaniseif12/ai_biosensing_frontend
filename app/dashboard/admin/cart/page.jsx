"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const USER_ID = 1;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch(`${API_BASE}/cart?user_id=${USER_ID}`);

        if (!res.ok) {
          console.error("Backend error:", await res.text());
          setCart([]);
          return;
        }

        const data = await res.json();
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setCart([]);
      }
    }

    loadCart();
  }, []);

  async function deleteItem(itemId) {
    try {
      const res = await fetch(
        `${API_BASE}/cart/delete?user_id=${USER_ID}&item_id=${itemId}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      console.log("Deleted:", data);

      setCart((prev) => prev.filter((item) => item.item_id !== itemId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  function goToCheckout() {
    router.push("/dashboard/admin/checkout");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "600px"
          }}
        >
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "15px",
                borderRadius: "8px",
                background: "#f8f9fa",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ marginBottom: "6px" }}>{item.item_name}</h3>

              <p style={{ margin: "4px 0" }}>
                <strong>Item ID:</strong> {item.item_id}
              </p>

              <p style={{ margin: "4px 0" }}>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <p style={{ margin: "4px 0", fontWeight: "bold" }}>
                ${item.price_usd}
              </p>

              <button
                onClick={() => deleteItem(item.item_id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Delete Item
              </button>
            </div>
          ))}

          <button
            onClick={goToCheckout}
            style={{
              marginTop: "20px",
              padding: "12px 18px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
