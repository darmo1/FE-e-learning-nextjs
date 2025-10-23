"use server";

import { cookies } from "next/headers";

export const setCookies = async (name: string, value: string) => {
  "use server"
  const _cookies = await cookies();
  return _cookies.set({
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    name,
    value,
    maxAge: 60*60*2
  });
};


export const getCookie = async (cookieName: string) => {
  const _cookies = await cookies();
  return _cookies.get(cookieName)?.value ?? null
}

export const deleteCookie = async (cookieName: string) => {
  const _cookies = await cookies();
  return _cookies.delete(cookieName);
}


export async function getAccessToken() {
  const accessToken = await getCookie("access_token");
  if (!accessToken) throw new Error("No access token found");
  return accessToken;
}