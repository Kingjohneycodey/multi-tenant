import { NextRequest, NextResponse } from "next/server";

function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Localhost handling
  if (hostname.includes("localhost")) {
    // Check if there's a subdomain before localhost
    const parts = hostname.split(".");
    if (parts.length > 1 && parts[0] !== "localhost" && parts[0] !== "www") {
      return parts[0];
    }
    return null; // No subdomain for localhost root
  }

  // Production handling - dynamically detect root domain from current request
  const parts = hostname.split(".");
  if (parts.length === 1) {
    // Single part domain (e.g., example.com) - no subdomain
    return null;
  }
  
  if (parts.length === 2) {
    // Two part domain (e.g., example.com) - no subdomain
    return null;
  }
  
  if (parts.length > 2) {
    // Multiple parts - check if first part is a subdomain
    const potentialSubdomain = parts[0];
    if (potentialSubdomain !== "www") {
      return potentialSubdomain;
    }
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const subdomain = extractSubdomain(request);
  
  // Debug logging
  console.log(`Middleware - Host: ${host}, Pathname: ${pathname}, Subdomain: ${subdomain}`);

  if (subdomain) {
    // Always rewrite to the tenant route structure internally
    const redirectUrl = new URL(`/tenant/${subdomain}${pathname}`, request.url);
    console.log(`Rewriting ${request.url} to ${redirectUrl.toString()}`);
    return NextResponse.rewrite(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};