import { NextRequest, NextResponse } from "next/server";
import { isProtectedPath, ROUTES } from "@/constants/routes";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isProtectedPath(pathname)) {
    const accessToken = req.cookies.get("access_token");

    if (!accessToken) {
      const loginUrl = new URL(ROUTES.AUTH, req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/course/:path*"],
};
