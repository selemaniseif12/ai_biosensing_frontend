import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_URL =
  "https://ai-biosensing-backend-trial2.onrender.com";

export async function POST(request: Request) {
  console.info("[admin-validate] POST request received");

  let body: { token?: unknown };

  try {
    body = await request.json();
    console.info("[admin-validate] JSON body parsed");
  } catch {
    console.warn("[admin-validate] Invalid JSON");

    return NextResponse.json(
      {
        access: "denied",
        detail: "Invalid JSON request body.",
      },
      { status: 400 }
    );
  }

  const token =
    typeof body?.token === "string" ? body.token.trim() : "";

  if (!token) {
    console.warn("[admin-validate] Missing token field");

    return NextResponse.json(
      {
        access: "denied",
        detail: "Administrator token required.",
      },
      { status: 400 }
    );
  }

  console.info("[admin-validate] Token field received");
  console.info("[admin-validate] Calling Render backend");

  let backendResponse: Response;

  try {
    const backendUrl = new URL("/admin-system/", BACKEND_URL);
    backendUrl.searchParams.set("token", token);

    backendResponse = await fetch(backendUrl.toString(), {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(20000),
    });
  } catch (error) {
    const err = error as Error;

    console.error("[admin-validate] Backend request failed", {
      name: err.name,
      message: err.message,
    });

    return NextResponse.json(
      {
        access: "denied",
        detail:
          err.name === "TimeoutError" || err.name === "AbortError"
            ? "Backend validation request timed out."
            : "Could not connect to the backend administrator service.",
      },
      { status: 502 }
    );
  }

  console.info(
    `[admin-validate] Backend HTTP status: ${backendResponse.status}`
  );

  let data: { access?: unknown; message?: unknown };

  try {
    data = await backendResponse.json();
  } catch {
    console.error("[admin-validate] Backend returned invalid JSON");

    return NextResponse.json(
      {
        access: "denied",
        detail: "The backend returned an invalid response.",
      },
      { status: 502 }
    );
  }

  if (!backendResponse.ok || data.access !== "granted") {
    console.warn("[admin-validate] Backend denied access");

    return NextResponse.json(
      {
        access: "denied",
        detail:
          backendResponse.status === 403
            ? "The backend rejected the administrator token."
            : "Backend validation failed.",
      },
      {
        status: backendResponse.status === 403 ? 403 : 502,
      }
    );
  }

  console.info("[admin-validate] Administrator access granted");

  return NextResponse.json(
    {
      access: "granted",
      message: "Administrator access verified.",
    },
    { status: 200 }
  );
}
