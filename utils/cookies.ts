"use server";

import { cookies } from "next/headers";

export const setCookies = async (
  name: string,
  value: string,
  maxAge: number = 60 * 60 * 2
) => {
  "use server"
  const _cookies = await cookies();
  _cookies.set({
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    name,
    value,
    maxAge,
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