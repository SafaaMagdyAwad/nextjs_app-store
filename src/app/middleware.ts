// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("__Secure-next-auth.session-token") || request.cookies.get("next-auth.session-token");
  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isAuthenticated && (pathname === "/profile" || pathname === "/orderHistory" || pathname === "/cart")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/register", "/orderHistory", "/cart"],
};

