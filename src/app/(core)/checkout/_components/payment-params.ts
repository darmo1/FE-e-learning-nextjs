import type { PaymentReturnParams } from "@/services/payments/types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** Normalizes the query params Mercado Pago appends on its back_urls. */
export const toPaymentReturnParams = (
  params: RawSearchParams
): PaymentReturnParams => ({
  payment_id: first(params.payment_id),
  status: first(params.status),
  external_reference: first(params.external_reference),
  preference_id: first(params.preference_id),
  collection_status: first(params.collection_status),
});
