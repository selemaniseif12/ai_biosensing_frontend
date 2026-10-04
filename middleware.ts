import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const role = request.cookies.get("role")?.value || null;

  const path = request.nextUrl.pathname;

  // If user is not logged in → redirect to login
  const protectedPaths = ["/dashboard", "/dashboard/", "/admin"];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin-only protection
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
