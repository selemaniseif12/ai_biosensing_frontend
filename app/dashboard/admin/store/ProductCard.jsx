"use client";

import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mt-1">{product.description}</p>

      <div className="mt-3">
        <span className="font-bold">${product.price_usd}</span>
        {product.billing_period !== "one_time" && (
          <span className="text-sm text-gray-500"> / {product.billing_period}</span>
        )}
      </div>

      {product.disabled ? (
        <button
          className="mt-4 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          disabled
        >
          Coming Soon
        </button>
      ) : (
        <button
          onClick={() => onAdd(product)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
