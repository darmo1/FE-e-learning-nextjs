import { NextPage } from "next";
import { KeyRound } from "lucide-react";
import { WrapperForgotPasswordForm } from "./components/wrapper-forgot-password-form";

const Page: NextPage = () => {
  return (
    <section className="flex min-h-[80vh] w-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
            <KeyRound className="h-4 w-4 text-gray-500" />
          </span>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Recupera tu contraseña
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Te enviaremos un enlace para crear una nueva
            </p>
          </div>
        </div>

        <WrapperForgotPasswordForm />
      </div>
    </section>
  );
};

export default Page;
