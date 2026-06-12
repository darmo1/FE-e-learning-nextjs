export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Auth } from "./_components/auth-form/auth";
import { getCookie } from "../../../../utils/cookies";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const cookies = await getCookie("access_token");
  if (cookies) {
    redirect("/");
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] w-full items-center justify-center">
          <Skeleton className="h-96 w-full max-w-sm rounded-lg" />
        </div>
      }
    >
      <Auth />
    </Suspense>
  );
}
