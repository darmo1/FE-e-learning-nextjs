import { Heading } from "@/components/ui/heading";
import { AuthWrapperSuscription, CtaStripe } from "./_components";
import { AuthRegister } from "../../auth/_components/auth-form";

type SuscriptionProps = "basic" | "pro" | "custom";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ suscription: SuscriptionProps }>;
}) {
  const { suscription } = await params;

  const getProduct = ({ suscription }: { suscription: string }) => {
    switch (suscription) {
      case "pro":
        return {
          name: "pro",
          unitAmount: 99,
        };
      case "basic":
        return {
          name: "basic",
          unitAmount: 20,
        };

      default:
        return {
          name: "custom",
          unitAmount: 100,
        };
    }
  };

  const productToBuy = getProduct({ suscription });

  return (
    <>
      <Heading
        title="Suscription"
        description="Bienvenido a la pagina de suscription"
      />

      <AuthWrapperSuscription product={productToBuy}>
        <AuthRegister />
      </AuthWrapperSuscription>

      <CtaStripe product={productToBuy} />
    </>
  );
}
