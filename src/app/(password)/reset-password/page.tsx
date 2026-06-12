import { NextPage } from "next";
import { LockKeyhole } from "lucide-react";
import { WrapperResetPasswordForm } from "./components/wrapper-reset-password-form";

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

const Page: NextPage<PageProps> = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;

  return (
    <section className="flex min-h-[80vh] w-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
            <LockKeyhole className="h-4 w-4 text-gray-500" />
          </span>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Nueva contraseña
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Elige tu nueva contraseña para volver a entrar
            </p>
          </div>
        </div>

        <WrapperResetPasswordForm token={token ?? ""} />
      </div>
    </section>
  );
};

export default Page;
