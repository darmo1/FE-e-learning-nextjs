import HighlightedHeading from "@/components/common/highlighted-heading";
import { NextPage } from "next";
import { WrapperForgotPasswordForm } from "./components/wrapper-forgot-password-form";
import { Container } from "@/components/common/containter";
import { Separator } from "@/components/ui/separator";

const Page: NextPage = () => {
  return (
    <section>
      <HighlightedHeading
        highlight="Recuperar contraseña"
        highlightClassName="before:bg-amber-500/30 mt-5"
        subtitle="Ingresa tu correo electrónico para recuperar tu contraseña"
      />

      <Container className="my-8">
        <WrapperForgotPasswordForm />
      </Container>
      <Separator className="my-8"/>

    </section>
  );
};

export default Page;
