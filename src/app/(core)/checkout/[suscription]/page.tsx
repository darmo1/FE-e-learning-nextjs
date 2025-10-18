import { Heading } from "@/components/ui/heading";
import { AuthWrapperSuscription, CtaStripe } from "./_components";
import { AuthRegister } from "../../auth/_components/auth-form";
import { SummaryPlan } from "./_components/summary-plan";

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
      <SummaryPlan />

      <AuthWrapperSuscription product={productToBuy}>
        <AuthRegister />
      </AuthWrapperSuscription>

      <CtaStripe product={productToBuy} />
    </>
  );
}
