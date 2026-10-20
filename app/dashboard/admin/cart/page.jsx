"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

function getCustomerToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("token="));

  if (!cookie) {
    return "";
  }

  try {
    return decodeURIComponent(cookie.substring("token=".length));
  } catch {
    return cookie.substring("token=".length);
  }
}

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingItem, setDeletingItem] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!API_BASE) {
      setError("The payment service is not configured. Please contact support.");
      setLoading(false);
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setError("Please log in to view your shopping cart.");
      setLoading(false);
      return;
    }

    try {
      // The backend must verify the JWT and derive the customer ID.
      // Do not send a customer ID supplied by the browser.
      const response = await fetch(`${API_BASE}/cart`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (response.status === 401 || response.status === 403) {
        setError("Your login may have expired. Please log in again.");
        setCart([]);
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to load your shopping cart."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected cart response.");
      }

      setCart(data);
    } catch (err) {
      console.error("Cart loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your shopping cart."
      );
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  async function deleteItem(itemId) {
    if (deletingItem) {
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setError("Please log in again before modifying your cart.");
      return;
    }

    if (!API_BASE) {
      setError("The payment service is not configured.");
      return;
    }

    setDeletingItem(itemId);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/cart/delete?item_id=${encodeURIComponent(itemId)}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => null);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Your login may have expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to delete this cart item."
        );
      }

      // Update the displayed cart only after the server confirms deletion.
      setCart((previous) =>
        previous.filter((item) => item.item_id !== itemId)
      );
    } catch (err) {
      console.error("Cart deletion error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete this cart item."
      );
    } finally {
      setDeletingItem("");
    }
  }

  function goToCheckout() {
    router.push("/dashboard/admin/checkout");
  }

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price_usd);
    const quantity = Number(item.quantity);

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(quantity) ||
      price < 0 ||
      quantity < 0
    ) {
      return sum;
    }

    return sum + price * quantity;
  }, 0);

  return (
    <main
      style={{
        padding: "24px",
        maxWidth: "850px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Your Cart</h1>

      {error && (
        <div
          role="alert"
          style={{
            padding: "12px",
            marginBottom: "16px",
            backgroundColor: "#fff3f3",
            border: "1px solid #dc3545",
            borderRadius: "6px",
            color: "#842029",
          }}
        >
          <p style={{ margin: 0 }}>{error}</p>

          {error.toLowerCase().includes("log in") && (
            <button
              onClick={() => router.push("/auth/login")}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Go to Login
            </button>
          )}
        </div>
      )}

      {loading ? (
        <p>Loading your cart...</p>
      ) : cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>

          <button
            onClick={loadCart}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Refresh Cart
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {cart.map((item) => (
            <article
              key={item.id}
              style={{
                padding: "16px",
                borderRadius: "8px",
                background: "#f8f9fa",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  marginBottom: "8px",
                }}
              >
                {item.item_name}
              </h2>

              <p style={{ margin: "5px 0" }}>
                <strong>Item ID:</strong> {item.item_id}
              </p>

              <p style={{ margin: "5px 0" }}>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <p style={{ margin: "5px 0" }}>
                <strong>Unit price:</strong>{" "}
                ${Number(item.price_usd).toFixed(2)} USD
              </p>

              <p
                style={{
                  margin: "8px 0",
                  fontWeight: "bold",
                }}
              >
                <strong>Subtotal:</strong>{" "}
                $
                {(
                  Number(item.price_usd) * Number(item.quantity)
                ).toFixed(2)}{" "}
                USD
              </p>

              <button
                onClick={() => deleteItem(item.item_id)}
                disabled={Boolean(deletingItem)}
                style={{
                  marginTop: "10px",
                  padding: "9px 14px",
                  backgroundColor: deletingItem
                    ? "#999"
                    : "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: deletingItem ? "not-allowed" : "pointer",
                }}
              >
                {deletingItem === item.item_id
                  ? "Deleting..."
                  : "Delete Item"}
              </button>
            </article>
          ))}

          <div
            style={{
              borderTop: "1px solid #ddd",
              paddingTop: "16px",
              marginTop: "8px",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Cart Total: ${total.toFixed(2)} USD
            </p>

            <p style={{ fontSize: "13px", color: "#555" }}>
              The backend calculates the authoritative amount charged
              at checkout.
            </p>

            <button
              onClick={goToCheckout}
              style={{
                marginTop: "10px",
                padding: "12px 18px",
                backgroundColor: "#198754",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}