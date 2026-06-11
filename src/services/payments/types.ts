/**
 * Provider-agnostic checkout types. The UI only knows these shapes; the
 * Mercado Pago specifics live in `actions.ts` so swapping gateways later
 * only requires changing the action implementation.
 */

export type CheckoutItemInput = {
  productId: string | number;
  title: string;
  /** Unit price in the store currency. */
  amount: number;
  quantity?: number;
};

export type CheckoutSession = {
  /** URL the buyer must be redirected to in order to complete the payment. */
  checkoutUrl: string;
  /** Gateway identifier for the session (e.g. Mercado Pago preference_id). */
  externalId?: string;
};

/**
 * Wire contract with the FastAPI backend for Mercado Pago Checkout Pro.
 *
 * POST /api/v1/payments/create-preference
 * Auth: `access_token` cookie. The backend must configure the preference
 * `back_urls` to point at /checkout/success, /checkout/failure and
 * /checkout/pending on this frontend.
 */
export type CreatePreferenceRequest = {
  product_id: string | number;
  title: string;
  unit_price: number;
  quantity: number;
};

export type CreatePreferenceResponse = {
  init_point: string;
  preference_id: string;
};

/** Query params Mercado Pago appends when redirecting back to the site. */
export type PaymentReturnParams = {
  payment_id?: string;
  status?: string;
  external_reference?: string;
  preference_id?: string;
  collection_status?: string;
};
