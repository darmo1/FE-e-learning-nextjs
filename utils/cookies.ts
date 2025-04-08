"use server";

import { cookies } from "next/headers";

export const setCookies = async (name: string, value: string) => {
  const _cookies = await cookies();
  return _cookies.set({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    name,
    value,
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
