// middleware.js
import { NextResponse } from "next/server";

const VALID_API_KEYS = [process.env.ADMIN_API_KEY].filter(Boolean);

// only apply middleware to api routes
export const config = {
  matcher: ["/api/:path*"],
};

const LEWS_RESTRICTIONS = {
  "/api/beads": ["POST", "PUT", "DELETE", "PATCH"],
  "/api/customers": ["GET", "POST", "PUT", "DELETE"],
  "/api/orders": ["GET", "POST", "PUT", "DELETE", "PATCH"],
  "/api/orders/[id]": ["GET", "PATCH", "DELETE"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (needsAuth(pathname, method)) {
    return requireAuth(request);
  }

  return NextResponse.next();
}

function needsAuth(pathname, method) {
  // handles static routes like /api/beads
  if (LEWS_RESTRICTIONS[pathname]?.includes(method)) {
    return true;
  }

  // handles dynamic routes like /api/orders/[id]
  for (const [route, methods] of Object.entries(LEWS_RESTRICTIONS)) {
    if (matchesRoute(pathname, route) && methods.includes(method)) {
      return true;
    }
  }

  return false;
}

function matchesRoute(pathname, routePattern) {
  if (routePattern.includes("[id]")) {
    const pattern = routePattern.replace("[id]", "\\d+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  }

  return pathname.startsWith(routePattern);
}

async function requireAuth(request) {
  try {
    const apiKey =
      request.headers.get("x-api-key") ||
      new URL(request.url).searchParams.get("api_key");

    if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}