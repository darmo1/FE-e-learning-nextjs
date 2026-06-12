import { NextRequest, NextResponse } from "next/server";
import { isProtectedPath, ROUTES } from "@/constants/routes";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isProtectedPath(pathname)) {
    const accessToken = req.cookies.get("access_token");

    if (!accessToken) {
      // El access token expira antes que el refresh token: si todavía hay
      // refresh, renueva la sesión en vez de obligar a iniciar sesión de nuevo
      const refreshToken = req.cookies.get("refresh_token");
      const target = refreshToken ? "/auth/refresh" : ROUTES.AUTH;
      const redirectUrl = new URL(target, req.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/course/:path*"],
};
