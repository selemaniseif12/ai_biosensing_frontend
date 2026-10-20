"use client";

import { useCallback, useEffect, useState } from "react";

// Set NEXT_PUBLIC_API_URL to your backend URL.
// Example: https://ai-biosensing-backend-trial2.onrender.com
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

// Read the customer JWT created by the existing login page.
function getCustomerToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("token="));

  if (!cookie) {
    return "";
  }

  const value = cookie.substring("token=".length);

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);

  // --------------------------------------------------
  // LOAD THE AUTHENTICATED CUSTOMER'S CART
  // --------------------------------------------------

  const loadCart = useCallback(async (cancelledRef) => {
    setLoading(true);
    setStatus("");
    setNeedsLogin(false);

    if (!API_BASE) {
      setStatus(
        "Payment service is not configured. Please contact support."
      );
      setLoading(false);
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setStatus("Please log in before accessing checkout.");
      setNeedsLogin(true);
      setCart([]);
      setLoading(false);
      return;
    }

    try {
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
        throw new Error(
          "Your login may have expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to load your shopping cart."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error(
          "The server returned an unexpected cart response."
        );
      }

      if (!cancelledRef.cancelled) {
        setCart(data);
      }
    } catch (error) {
      console.error("Checkout cart-loading error:", error);

      if (!cancelledRef.cancelled) {
        setCart([]);

        setStatus(
          error instanceof Error
            ? error.message
            : "Unable to load your shopping cart."
        );

        if (
          error instanceof Error &&
          error.message.toLowerCase().includes("log in")
        ) {
          setNeedsLogin(true);
        }
      }
    } finally {
      if (!cancelledRef.cancelled) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const cancelledRef = { cancelled: false };

    loadCart(cancelledRef);

    return () => {
      cancelledRef.cancelled = true;
    };
  }, [loadCart]);

  // --------------------------------------------------
  // DISPLAY TOTAL
  // This is informational only.
  // The backend determines the amount charged by Stripe.
  // --------------------------------------------------

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

  // --------------------------------------------------
  // START STRIPE CHECKOUT
  // --------------------------------------------------

  async function finalizePurchase() {
    if (checkoutLoading) {
      return;
    }

    setStatus("");
    setNeedsLogin(false);

    if (!API_BASE) {
      setStatus("Payment service is not configured.");
      return;
    }

    if (cart.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setStatus("Please log in before starting payment.");
      setNeedsLogin(true);
      return;
    }

    setCheckoutLoading(true);
    setStatus("Preparing secure payment checkout...");

    try {
      // No user_id is supplied by the browser.
      // The backend identifies the customer from the verified JWT.
      const response = await fetch(
        `${API_BASE}/store/stripe/checkout`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        setNeedsLogin(true);

        throw new Error(
          "Your login may have expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to start payment. Please try again."
        );
      }

      if (
        typeof data.checkout_url !== "string" ||
        !data.checkout_url
      ) {
        throw new Error(
          "The payment server did not return a Stripe Checkout URL."
        );
      }

      // Accept redirects only to Stripe's HTTPS Checkout host.
      let checkoutUrl;

      try {
        checkoutUrl = new URL(data.checkout_url);
      } catch {
        throw new Error(
          "The payment server returned an invalid checkout URL."
        );
      }

      if (
        checkoutUrl.protocol !== "https:" ||
        checkoutUrl.hostname !== "checkout.stripe.com"
      ) {
        throw new Error(
          "The payment server returned an untrusted checkout address."
        );
      }

      setStatus("Redirecting to Stripe's secure payment page...");

      window.location.assign(checkoutUrl.toString());
    } catch (error) {
      console.error("Stripe checkout error:", error);

      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to connect to the payment service."
      );

      setCheckoutLoading(false);
    }
  }

  // --------------------------------------------------
  // CHECKOUT PAGE
  // --------------------------------------------------

  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "20px" }}>Checkout</h1>

      {loading && <p>Loading your cart...</p>}

      {!loading && !status && cart.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {status && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginBottom: "16px",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: status.startsWith("Redirecting")
              ? "#e8f5e9"
              : "#fff3f3",
            color: status.startsWith("Redirecting")
              ? "#166534"
              : "#842029",
          }}
        >
          <p style={{ margin: 0 }}>{status}</p>

          {needsLogin && (
            <button
              type="button"
              onClick={() => {
                window.location.assign("/auth/login");
              }}
              style={{
                marginTop: "12px",
                padding: "9px 14px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Go to Login
            </button>
          )}
        </div>
      )}

      {!loading && cart.length > 0 && (
        <section style={{ maxWidth: "650px" }}>
          <h2 style={{ marginBottom: "12px" }}>Order Summary</h2>

          <div
            style={{
              padding: "16px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
              marginBottom: "20px",
            }}
          >
            {cart.map((item, index) => {
              const price = Number(item.price_usd) || 0;
              const quantity = Number(item.quantity) || 0;
              const subtotal = price * quantity;

              return (
                <div
                  key={item.id ?? item.item_id ?? index}
                  style={{
                    padding: "14px",
                    marginBottom: "12px",
                    borderRadius: "8px",
                    background: "#f5f9ff",
                    border: "1px solid #d5e5f7",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: "8px",
                      color: "#174ea6",
                    }}
                  >
                    {item.item_name}
                  </h3>

                  <p style={{ margin: "5px 0" }}>
                    <strong>Item ID:</strong> {item.item_id}
                  </p>

                  <p style={{ margin: "5px 0" }}>
                    <strong>Quantity:</strong> {quantity}
                  </p>

                  <p style={{ margin: "5px 0" }}>
                    <strong>Unit price:</strong> ${price.toFixed(2)} USD
                  </p>

                  <p style={{ margin: "5px 0", fontWeight: "600" }}>
                    <strong>Subtotal:</strong> ${subtotal.toFixed(2)} USD
                  </p>
                </div>
              );
            })}

            <h3
              style={{
                marginTop: "20px",
                fontSize: "22px",
                color: "#222",
              }}
            >
              Total: ${total.toFixed(2)} USD
            </h3>

            <p style={{ fontSize: "13px", color: "#666" }}>
              This total is for display purposes. The backend obtains
              product prices from its catalogue when creating Stripe
              Checkout.
            </p>
          </div>

          <button
            type="button"
            onClick={finalizePurchase}
            disabled={checkoutLoading || loading}
            style={{
              padding: "12px 18px",
              backgroundColor: checkoutLoading ? "#777" : "#087bdb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: checkoutLoading ? "wait" : "pointer",
              fontSize: "16px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            }}
          >
            {checkoutLoading
              ? "Connecting to Stripe..."
              : "Proceed to Secure Payment"}
          </button>
        </section>
      )}
    </main>
  );
}