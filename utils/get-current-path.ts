// utils/getCurrentPath.ts
'use server';
import { headers } from "next/headers";

export async function getCurrentPath() {
  const referer = (await headers()).get("referer");
  return referer ? new URL(referer).pathname : "/";
}
