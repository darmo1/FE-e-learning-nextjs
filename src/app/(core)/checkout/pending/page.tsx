import { PaymentStatusCard } from "../_components/payment-status-card";
import {
  toPaymentReturnParams,
  type RawSearchParams,
} from "../_components/payment-params";

export default async function CheckoutPendingPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const details = toPaymentReturnParams(await searchParams);

  return (
    <PaymentStatusCard
      variant="pending"
      title="Pago en proceso"
      description="Tu pago está siendo procesado. Te notificaremos por correo cuando se acredite."
      details={details}
    />
  );
}
