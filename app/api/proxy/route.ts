import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const { pathname, searchParams } = new URL(request.url);

    // Extract the actual API path after /api/proxy
    const apiPath = pathname.replace("/api/proxy", "");

    // Forward cookies (JWT)
    const cookieHeader = request.headers.get("cookie") || "";

    // Forward body
    const body = await request.json();

    const backendResponse = await fetch(`${BACKEND_URL}${apiPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Proxy error", details: String(error) },
      { status: 500 }
    );
  }
}
