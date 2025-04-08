import { Suspense } from "react";
import { Auth } from "./_components/auth-form/auth";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando</div>}>
      <Auth />
    </Suspense>
  );
}
