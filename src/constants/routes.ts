export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  COURSE: "/course",
  CHECKOUT: "/checkout",
} as const;

/** Route prefixes that require an authenticated session. */
export const PROTECTED_ROUTE_PREFIXES = [ROUTES.DASHBOARD, ROUTES.COURSE] as const;

export const isProtectedPath = (pathname: string) =>
  PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
