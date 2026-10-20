"use client";

import { useEffect, useState } from "react";

// Backend URL from the existing Next.js environment configuration.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

// Read the customer JWT created by the existing email-and-password login.
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

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [addedItemId, setAddedItemId] = useState(null);
  const [comingSoonId, setComingSoonId] = useState(null);
  const [addingItemId, setAddingItemId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Preserve the existing purchasing restrictions in the UI.
  // The backend must also enforce any business purchasing restrictions.
  const allowedNames = [
    "Fixed Consulting Package",
    "Custom Consulting Package",
    "Low-Grade Patented Biosensing Device",
  ];

  const categories = [
    { id: "all", label: "All", color: "#444" },
    { id: "service", label: "Services", color: "#007bff" },
    { id: "course", label: "Courses", color: "#28a745" },
    { id: "digital", label: "Digital", color: "#6f42c1" },
    { id: "physical", label: "Devices", color: "#e83e8c" },
  ];

  // --------------------------------------------------
  // LOAD PRODUCTS
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");

      if (!API_BASE) {
        setError(
          "The store service is not configured. Please contact support."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/store/products`, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            typeof data?.detail === "string"
              ? data.detail
              : "Unable to load store products."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "The store service returned an unexpected response."
          );
        }

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Store product-loading error:", err);

        if (!cancelled) {
          setProducts([]);
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load store products."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // FILTER PRODUCTS
  // --------------------------------------------------

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.type === filter);

  // --------------------------------------------------
  // ADD PRODUCT TO AUTHENTICATED CUSTOMER'S CART
  // --------------------------------------------------

  async function addToCart(item) {
    if (!allowedNames.includes(item.name)) {
      setComingSoonId(item.item_id);

      setTimeout(() => {
        setComingSoonId(null);
      }, 2000);

      return;
    }

    if (addingItemId !== null) {
      return;
    }

    setError("");

    if (!API_BASE) {
      setError("The store service is not configured.");
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setError("Please log in before adding items to your cart.");
      return;
    }

    setAddingItemId(item.item_id);

    try {
      // Do not send user_id from the browser.
      // The backend derives the customer from the verified JWT.
      const response = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item_id: item.item_id,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Your login may have expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : "Unable to add this item to your cart."
        );
      }

      setAddedItemId(item.item_id);

      setTimeout(() => {
        setAddedItemId(null);
      }, 2000);

      console.log("Added to cart:", data);
    } catch (err) {
      console.error("Store add-to-cart error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the cart service."
      );
    } finally {
      setAddingItemId(null);
    }
  }

  // --------------------------------------------------
  // STORE PAGE
  // --------------------------------------------------

  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Store Products</h1>

      {error && (
        <div
          role="alert"
          style={{
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: "#fff3f3",
            color: "#842029",
            border: "1px solid #dc3545",
            borderRadius: "6px",
          }}
        >
          <p style={{ margin: 0 }}>{error}</p>

          {error.toLowerCase().includes("log in") && (
            <button
              type="button"
              onClick={() => {
                window.location.assign("/auth/login");
              }}
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

      {/* CATEGORY FILTERS */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setFilter(category.id)}
            aria-pressed={filter === category.id}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: category.color,
              color: "white",
              cursor: "pointer",
              opacity: filter === category.id ? 1 : 0.6,
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      {loading && <p>Loading store products...</p>}

      {!loading && products.length === 0 && !error && (
        <p>No products are currently available.</p>
      )}

      {!loading &&
        products.length > 0 &&
        filteredProducts.length === 0 && (
          <p>No products are available in this category.</p>
        )}

      {/* PRODUCT GRID */}

      {!loading && filteredProducts.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((item) => {
            const isAllowed = allowedNames.includes(item.name);
            const isAdding = addingItemId === item.item_id;

            const price = Number(item.price_usd);
            const validPrice = Number.isFinite(price) && price >= 0;

            return (
              <article
                key={item.item_id}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f8f9fa, #eef3ff)",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "scale(1)";
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginTop: 0,
                  }}
                >
                  {item.name}
                </h2>

                <p>Type: {item.type}</p>
                <p>Billing: {item.billing_period}</p>

                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {validPrice ? `$${price.toFixed(2)}` : "Price unavailable"} USD
                </p>

                {/* PURCHASABLE PRODUCT BUTTON */}

                {isAllowed ? (
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    disabled={addingItemId !== null || !validPrice}
                    style={{
                      marginTop: "10px",
                      padding: "10px 14px",
                      backgroundColor:
                        isAdding || !validPrice ? "#777" : "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor:
                        addingItemId !== null || !validPrice
                          ? "wait"
                          : "pointer",
                      width: "100%",
                      fontSize: "16px",
                    }}
                  >
                    {isAdding ? "Adding..." : "Add to Cart"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setComingSoonId(item.item_id);

                      setTimeout(() => {
                        setComingSoonId(null);
                      }, 2000);
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "10px 14px",
                      backgroundColor: "#ffc107",
                      color: "#333",
                      border: "none",
                      borderRadius: "6px",
                      textAlign: "center",
                      fontWeight: "700",
                      cursor: "pointer",
                      width: "100%",
                      fontSize: "16px",
                    }}
                  >
                    Coming Soon!
                  </button>
                )}

                {/* ADDED-TO-CART MESSAGE */}

                {addedItemId === item.item_id && (
                  <div
                    role="status"
                    style={{
                      marginTop: "10px",
                      padding: "8px",
                      background: "#d4edda",
                      color: "#155724",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Added to cart
                  </div>
                )}

                {/* COMING-SOON MESSAGE */}

                {comingSoonId === item.item_id && !isAllowed && (
                  <div
                    role="status"
                    style={{
                      marginTop: "10px",
                      padding: "8px",
                      background: "#ffe8a1",
                      color: "#8a6d3b",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Coming Soon!
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}