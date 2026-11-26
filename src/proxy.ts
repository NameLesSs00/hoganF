import { NextResponse, type NextRequest } from "next/server";

const ADMIN_TOKEN_COOKIE = "hogan_admin_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Phase 1: Any URL outside /admin returns HTTP 404 (custom src/app/not-found.tsx).
  // When Phase 2 (Public Website) begins, restore next-intl routing for non-admin paths here.
  if (!pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL("/__not_found__", request.url));
  }

  const hasToken = Boolean(request.cookies.get(ADMIN_TOKEN_COOKIE)?.value);
  const isLoginRoute = pathname === "/admin/login" || pathname === "/admin/login/";

  // Authenticated admins cannot view /admin/login — redirect straight to /admin.
  if (isLoginRoute && hasToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Unauthenticated visitors cannot access protected /admin/* pages — redirect to /admin/login.
  if (!isLoginRoute && !hasToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
