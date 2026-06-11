import HighlightedHeading from "@/components/common/highlighted-heading";
import { Container } from "@/components/common/containter";
import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";
import { WrapperResetPasswordForm } from "./components/wrapper-reset-password-form";

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

const Page: NextPage<PageProps> = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;

  return (
    <section>
      <HighlightedHeading
        highlight="Nueva contraseña"
        highlightClassName="before:bg-amber-500/30 mt-5"
        subtitle="Elige tu nueva contraseña para volver a entrar"
      />

      <Container className="my-8">
        <WrapperResetPasswordForm token={token ?? ""} />
      </Container>
      <Separator className="my-8" />
    </section>
  );
};

export default Page;
