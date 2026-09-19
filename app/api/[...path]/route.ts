import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  // FIX: Proper type for firebaseUser
  let firebaseUser: { valid: boolean; userId: string | null } | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    // FIX: Now assignable to the correct type
    firebaseUser = await verifyIdToken(token).catch(() => null);
  }

  const body = await request.json();

  return NextResponse.json({
    message: "API route working",
    firebaseUser,
    body,
  });
}
