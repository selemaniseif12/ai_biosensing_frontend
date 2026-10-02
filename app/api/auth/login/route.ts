import { NextResponse } from "next/server";

export async function POST() {
  // Remove token stored in cookies (if any)
  const response = NextResponse.json({ message: "Logged out" });

  // Clear token cookie
  response.cookies.set("token", "", { expires: new Date(0) });

  return response;
}
