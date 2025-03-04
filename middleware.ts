import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  // Allow access to login and register pages for everyone
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  // If user is not logged in, redirect them to /login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // Get user role
  const userRole = session.user?.role; // Make sure 'role' exists in session

  if (userRole === "admin") {
    // Admin can access everything
    return NextResponse.next();
  }

  if (userRole === "employee") {
    // Allowed paths for employees
    const allowedPaths = ["/", "/my-requests", "/request/create"];
    const isAllowed = allowedPaths.some((allowedPath) =>
      pathname.startsWith(allowedPath),
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|register|login).*)",
  ],
};
