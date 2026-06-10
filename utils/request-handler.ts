import { redirect } from "next/navigation";
import { getCurrentPath } from "./get-current-path";
import { headerAccessTokenCookie } from "./headers";

type RequestHandlerProps = Omit<RequestInit, "body" | "credentials"> & {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const extractErrorMessage = (details: unknown): string | undefined => {
  if (details && typeof details === "object") {
    const { message, detail, error } = details as Record<string, unknown>;
    const candidate = message ?? detail ?? error;
    if (typeof candidate === "string") return candidate;
  }
  return undefined;
};

/**
 * Thin fetch wrapper for calling the backend from server actions and server
 * components. Attaches the session cookie, normalizes errors into `ApiError`
 * and redirects to the token refresh flow on 401.
 */
export const requestHandler = async <T = unknown>({
  url,
  method = "GET",
  body,
  headers = {},
  credentials = "include",
  ...options
}: RequestHandlerProps): Promise<{ data: T; response: Response }> => {
  const authHeaders = (await headerAccessTokenCookie()) ?? {};

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
    credentials,
    ...options,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    const currentPath = await getCurrentPath();
    redirect(`/auth/refresh?redirect=${encodeURIComponent(currentPath)}`);
  }

  if (!response.ok) {
    const details = await response.json().catch(() => null);
    throw new ApiError(
      extractErrorMessage(details) ?? `Request to ${url} failed`,
      response.status,
      details
    );
  }

  const data = (await response.json().catch(() => undefined)) as T;
  return { data, response };
};
