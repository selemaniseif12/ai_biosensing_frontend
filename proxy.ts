import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebaseAdmin";
import * as admin from "firebase-admin";

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // ----------------------------------------------------
  // 1) ADMIN PROTECTION — /admin/*
  // ----------------------------------------------------
  if (path.startsWith("/admin")) {
    const cookieHeader = request.headers.get("cookie");
    const token = cookieHeader
      ?.split("; ")
      .find((c) => c.startsWith("session="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = await verifyIdToken(token);

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // ----------------------------------------------------
  // 2) API KEY AUTH + RATE LIMITING — /api/v1/*
  // ----------------------------------------------------
  if (path.startsWith("/api/v1")) {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 });
    }

    const keyRef = admin.firestore().collection("apiKeys").doc(apiKey);
    const keySnap = await keyRef.get();

    if (!keySnap.exists) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const keyData = keySnap.data();

    if (!keyData) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (keyData.revoked) {
      return NextResponse.json({ error: "API key revoked" }, { status: 403 });
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
        return NextResponse.json(
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
    const usageRef = admin
      .firestore()
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

    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/v1/:path*"],
};
