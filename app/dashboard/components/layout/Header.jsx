"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

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

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    if (!API_BASE) {
      console.error("Cart count unavailable: API URL is not configured.");
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setCartCount(0);
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

      if (response.status === 401 || response.status === 403) {
        setCartCount(0);
        return;
      }

      if (!response.ok) {
        throw new Error(`Cart request failed with status ${response.status}.`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The backend returned an invalid cart response.");
      }

      // Preserve the previous badge behaviour: count cart entries,
      // rather than the total quantity of all entries.
      setCartCount(data.length);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Left side: Logo or Title */}
      <h1 className="text-2xl font-bold">AI Biosensing Dashboard</h1>

      {/* Right side: Cart Icon */}
      <Link
        href="/dashboard/admin/cart"
        className="relative"
        aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700 hover:text-black transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13l1.6-8m0 0h8.8M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>

          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}