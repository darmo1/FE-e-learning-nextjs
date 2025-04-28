// app/actions/auth.ts
"use server";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { apiEndpoints } from "@/constants/endpoints.api";

export async function refreshTokenAction() {
  const storeCookies = await cookies();

  try {
    const response = await fetch(apiEndpoints.COOKIE, {
      method: "POST",
      credentials: "include",
    });

    if (response.redirected || response.status === 401 || !response.ok) {
      console.warn(
        "❌ Refresh token request failed or was redirected:",
        response.status
      );
      return null;
    }

    const rawSetCookie = response.headers.get("set-cookie");

    if (!rawSetCookie) {
      console.warn("❌ No Set-Cookie header received from refresh endpoint.");
      return null;
    }

    const parsed = parse(rawSetCookie);
    const accessToken = parsed.access_token;

    if (!accessToken) {
      console.warn("❌ access_token not found in Set-Cookie.");
      return null;
    }

    storeCookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    return accessToken;
  } catch (error) {
    console.error("🔥 Error in refreshTokenAction:", error);
    return null;
  }
}
