export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Auth } from "./_components/auth-form/auth";

export default async function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-2xl font-semibold text-purple-500">
          Cargando Desde Auth
        </div>
      }
    >
      <Auth />
    </Suspense>
  );
}
