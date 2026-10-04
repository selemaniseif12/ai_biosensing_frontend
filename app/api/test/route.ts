import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    let firebaseUser: { valid: boolean; userId: string | null } | null = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      firebaseUser = await verifyIdToken(token).catch(() => null);
    }

    const body = await request.json();

    return NextResponse.json({
      message: "API route working",
      firebaseUser,
      body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
