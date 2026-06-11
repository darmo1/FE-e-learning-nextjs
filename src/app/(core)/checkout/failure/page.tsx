import { PaymentStatusCard } from "../_components/payment-status-card";
import {
  toPaymentReturnParams,
  type RawSearchParams,
} from "../_components/payment-params";
import { ROUTES } from "@/constants/routes";

export default async function CheckoutFailurePage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const details = toPaymentReturnParams(await searchParams);

  return (
    <PaymentStatusCard
      variant="failure"
      title="El pago no pudo completarse"
      description="No se realizó ningún cargo. Puedes intentarlo de nuevo o usar otro medio de pago."
      details={details}
      ctaHref={ROUTES.HOME}
      ctaLabel="Intentar de nuevo"
    />
  );
}
