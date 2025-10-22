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
          discount: 20,
          total: 79,
          benefits: [
            "Acceso a todos los cursos",
            "Materiales descargables",
            "Soporte prioritario",
            "Certificados de finalización",
          ],
        };
      case "basic":
        return {
          name: "basic",
          unitAmount: 20,
          discount: 5,
          total: 15,
          benefits: [
            "Acceso a cursos básicos",
            "Comunidad de estudiantes",
            "Certificados de finalización",
          ],
        };

      default:
        return {
          name: "custom",
          unitAmount: 100,
          discount: 0,
          total: 100,
          benefits: [
            "Plan personalizado según tus necesidades",
            "Soporte dedicado",
            "Acceso anticipado a nuevos cursos",
          ],
        };
    }
  };

  const productToBuy = getProduct({ suscription });

  return (
    <>
      <SummaryPlan {...productToBuy} />
      <AuthWrapperSuscription product={productToBuy}>
        <AuthRegister />
      </AuthWrapperSuscription>
      <CtaStripe product={productToBuy} />
    </>
  );
}
