import { NextResponse } from "next/server";

const BACKEND_URL =
  "https://ai-biosensing-backend-trial2.onrender.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const token =
      typeof body.token === "string" ? body.token.trim() : "";

    if (!token) {
      return NextResponse.json(
        { access: "denied", detail: "Administrator token required." },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${BACKEND_URL}/admin-system/?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await backendResponse.json().catch(() => ({}));

    if (!backendResponse.ok || data.access !== "granted") {
      return NextResponse.json(
        {
          access: "denied",
          detail: "Administrator token is invalid or expired.",
        },
        { status: backendResponse.status === 403 ? 403 : 502 }
      );
    }

    return NextResponse.json(
      {
        access: "granted",
        message: "Administrator access verified.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin token validation failed:", error);

    return NextResponse.json(
      {
        access: "denied",
        detail: "Could not contact the backend administrator service.",
      },
      { status: 502 }
    );
  }
}