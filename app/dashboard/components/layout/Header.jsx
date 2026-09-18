"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const user_id = 1; // Replace with real user ID from your auth system

  // -----------------------------
  // Fetch cart count
  // -----------------------------
  const fetchCartCount = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/store/cart?user_id=${user_id}`);
      const data = await res.json();
      setCartCount(data.length);
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Left side: Logo or Title */}
      <h1 className="text-2xl font-bold">AI Biosensing Dashboard</h1>

      {/* Right side: Cart Icon */}
      <Link href="/dashboard/admin/cart" className="relative">
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700 hover:text-black transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
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
