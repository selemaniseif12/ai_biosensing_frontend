"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

function formatDate(value) {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString();
}

function formatAmount(amount, currency) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "Amount unavailable";
  }

  const currencyCode = String(currency || "USD").toUpperCase();

  return `${value.toFixed(2)} ${currencyCode}`;
}

export default function ReceiptsPage() {
  const router = useRouter();

  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReceipts = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!API_BASE) {
      setError(
        "The payment service is not configured. Please contact support."
      );
      setLoading(false);
      return;
    }

    const token = getCustomerToken();

    if (!token) {
      setError("Please log in to view your receipts.");
      setReceipts([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/receipts/list`, {
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
          typeof data?.detail === "string"
            ? data.detail
            : "Unable to load your receipts."
        );
      }

      if (!Array.isArray(data?.receipts)) {
        throw new Error(
          "The server returned an unexpected receipts response."
        );
      }

      setReceipts(data.receipts);
    } catch (err) {
      console.error("Receipt-loading error:", err);

      setReceipts([]);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your receipts."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReceipts();
  }, [loadReceipts]);

  function showReceipt(receipt) {
    const items = Array.isArray(receipt.items)
      ? receipt.items.join("\n")
      : "No item details available.";

    window.alert(
      [
        `Invoice: ${receipt.invoice_number || "Unavailable"}`,
        `Service: ${receipt.service_name || "Purchase"}`,
        `Amount: ${formatAmount(receipt.amount_paid, receipt.currency)}`,
        `Date: ${formatDate(receipt.date)}`,
        "",
        "Items:",
        items || "No item details available.",
      ].join("\n")
    );
  }

  function goToLogin() {
    router.push("/auth/login");
  }

  return (
    <main className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Receipts History</h1>

        <button
          type="button"
          onClick={loadReceipts}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded border border-red-300 bg-red-50 p-4 text-red-800"
        >
          <p>{error}</p>

          {error.toLowerCase().includes("log in") && (
            <button
              type="button"
              onClick={goToLogin}
              className="mt-3 rounded bg-red-700 px-4 py-2 text-white"
            >
              Go to Login
            </button>
          )}
        </div>
      )}

      {loading ? (
        <p>Loading receipts...</p>
      ) : error ? null : receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {receipts.map((receipt) => (
            <article
              key={receipt.receipt_id}
              className="cursor-pointer rounded border bg-white p-4 shadow transition hover:bg-gray-50"
              onClick={() => showReceipt(receipt)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  showReceipt(receipt);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <h2 className="text-lg font-semibold">
                {receipt.invoice_number || `Receipt #${receipt.receipt_id}`}
              </h2>

              <p className="mt-1">
                <strong>Service:</strong>{" "}
                {receipt.service_name || "Purchase"}
              </p>

              <p className="mt-1">
                <strong>Amount:</strong>{" "}
                {formatAmount(receipt.amount_paid, receipt.currency)}
              </p>

              <p className="mt-1">
                <strong>Date:</strong> {formatDate(receipt.date)}
              </p>

              {Array.isArray(receipt.items) &&
                receipt.items.length > 0 && (
                  <div className="mt-3">
                    <p className="font-medium">Items</p>
                    <ul className="ml-5 mt-1 list-disc">
                      {receipt.items.map((item, index) => (
                        <li key={`${receipt.receipt_id}-${index}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <p className="mt-3 text-sm text-blue-700">
                Select receipt to view its details.
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}