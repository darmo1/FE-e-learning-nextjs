export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Auth } from "./_components/auth-form/auth";
import { getCookie } from "../../../../utils/cookies";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page() {
  const cookies = await getCookie("access_token");
  if (cookies) {
    redirect("/");
  }

  return (
    <Suspense
      fallback={
        <div className="text-2xl font-semibold text-white-500">
          Cargando Desde Auth
        </div>
      }
    >
      <div className="order-2 relative w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/login_logout_image.png"
          alt="Login illustration"
          width={800}
          height={800}
          className="w-full rounded-md object-contain p-8"
          priority
        />
        <div className="absolute inset-0 ">
          <div className="flex  p-8 md:p-12">
            <h1 className="bg-white/70 rounded-xl  py-2 text-xl font-bold  md:text-4xl lg:text-4xl text-balance md:mt-8 max-w-2/3 text-center mx-auto">
              Join our community today
            </h1>
          </div>
        </div>
      </div>

      <div className="order-1  w-full md:w-1/2 border-e-1 border-gray-200">
        <Auth />
      </div>
    </Suspense>
  );
}
