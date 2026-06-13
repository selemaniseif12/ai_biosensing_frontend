import { rewrite, redirect, next } from "next/server";
import { verifyIdToken } from "@/lib/firebaseAdmin";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export async function proxy(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // ----------------------------------------------------
  // 1) ADMIN PROTECTION — /admin/*
  // ----------------------------------------------------
  if (path.startsWith("/admin")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      return redirect("/login");
    }

    try {
      const decoded = await verifyIdToken(token);

      if (decoded.role !== "admin") {
        return redirect("/login");
      }

      return next();
    } catch {
      return redirect("/login");
    }
  }

  // ----------------------------------------------------
  // 2) API KEY AUTH + RATE LIMITING — /api/v1/*
  // ----------------------------------------------------
  if (path.startsWith("/api/v1")) {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return Response.json({ error: "Missing API key" }, { status: 401 });
    }

    const keyRef = db.collection("apiKeys").doc(apiKey);
    const keySnap = await keyRef.get();

    if (!keySnap.exists) {
      return Response.json({ error: "Invalid API key" }, { status: 401 });
    }

    const keyData = keySnap.data();

    if (keyData.revoked) {
      return Response.json({ error: "API key revoked" }, { status: 403 });
    }

    // -------------------------
    // Rate limiting per minute
    // -------------------------
    const now = Date.now();
    const windowMs = 60_000;
    const limit = keyData.rateLimitPerMinute ?? 60;

    const windowStart = keyData.windowStart?.toMillis
      ? keyData.windowStart.toMillis()
      : 0;

    const windowCount = keyData.windowCount ?? 0;

    if (!windowStart || now - windowStart > windowMs) {
      await keyRef.update({
        windowStart: admin.firestore.Timestamp.fromMillis(now),
        windowCount: 1,
        usageCount: admin.firestore.FieldValue.increment(1),
        lastUsedAt: admin.firestore.Timestamp.fromMillis(now),
      });
    } else {
      if (windowCount >= limit) {
        return Response.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }

      await keyRef.update({
        windowCount: admin.firestore.FieldValue.increment(1),
        usageCount: admin.firestore.FieldValue.increment(1),
        lastUsedAt: admin.firestore.Timestamp.fromMillis(now),
      });
    }

    // -------------------------
    // Usage Metering (per user)
    // -------------------------
    const userId = keyData.userId;
    const endpoint = path;

    const today = new Date().toISOString().split("T")[0];
    const usageRef = db
      .collection("usage")
      .doc(userId)
      .collection("daily")
      .doc(today);

    const usageSnap = await usageRef.get();

    if (!usageSnap.exists) {
      await usageRef.set({
        totalRequests: 1,
        endpointBreakdown: { [endpoint]: 1 },
        lastUpdated: admin.firestore.Timestamp.now(),
      });
    } else {
      await usageRef.update({
        totalRequests: admin.firestore.FieldValue.increment(1),
        [`endpointBreakdown.${endpoint}`]:
          admin.firestore.FieldValue.increment(1),
        lastUpdated: admin.firestore.Timestamp.now(),
      });
    }

    // Inject user ID into request headers
    const newHeaders = new Headers(request.headers);
    newHeaders.set("x-user-id", userId);

    return next({ request: { headers: newHeaders } });
  }

  return next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/v1/:path*"],
};
