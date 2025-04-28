// utils/redirectIfUnauthorized.ts
import { redirect } from "next/navigation";

export async function redirectIfUnauthorized({
  currentPath,
  status,
}: {
  status: number;
  currentPath: string;
}) {

  if (status === 401) {
    console.log("⚠️ Token vencido. Redirigiendo...");
    redirect(`/auth/refresh?redirect=${encodeURIComponent(currentPath)}`);
  }
}
