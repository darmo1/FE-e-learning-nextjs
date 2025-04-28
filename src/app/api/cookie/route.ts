// app/api/refresh-cookie/route.ts

import { NextResponse } from "next/server";
import { parse } from "cookie";
import { ENDPOINT } from "@/constants/endpoints";
import { getCookie } from "../../../../utils/cookies";

export async function POST() {
  try{
  const refreshToken = await getCookie("refresh_token");

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh_token" }, { status: 401 });
  }

  // Llama al backend FastAPI
  const res = await fetch(ENDPOINT.REFRESH_TOKEN, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }

  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) {
    return NextResponse.json({ error: "Missing set-cookie" }, { status: 401 });
  }

  const parsed = parse(setCookie);
  const newAccessToken = parsed.access_token;

  if (!newAccessToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, newAccessToken });

  response.cookies.set("access_token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;

  }catch(error){
    console.error("Error refreshing token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
  
}
