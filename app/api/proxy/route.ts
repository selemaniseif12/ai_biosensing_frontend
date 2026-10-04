import { NextResponse } from "next/server";

const BACKEND_URL = "https://ai-biosensing-backend-trial2.onrender.com";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const apiPath = url.pathname.replace("/api/proxy", "");
    const query = url.search;

    const cookieHeader = request.headers.get("cookie") || "";

    const backendResponse = await fetch(`${BACKEND_URL}${apiPath}${query}`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Proxy GET error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const apiPath = url.pathname.replace("/api/proxy", "");

    const cookieHeader = request.headers.get("cookie") || "";
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
      { error: "Proxy POST error", details: String(error) },
      { status: 500 }
    );
  }
}
