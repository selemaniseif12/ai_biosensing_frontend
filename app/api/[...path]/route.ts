import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebaseAdmin";

// Use your Render backend URL from .env
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request, { params }: any) {
  const path = params.path.join("/"); // e.g. auth/login
  const target = `${BACKEND_URL}/${path}`;

  const authHeader = request.headers.get("Authorization");
  let firebaseUser = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    firebaseUser = await verifyIdToken(token).catch(() => null);
  }

  const body = await request.json();

  const response = await fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(firebaseUser ? { "x-user-id": firebaseUser.uid } : {})
    },
    body: JSON.stringify(body)
  });

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, { status: response.status });
}
