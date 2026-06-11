"use server";

import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { ActionResult, actionFailure, actionSuccess } from "../types";
import {
  CheckoutItemInput,
  CheckoutSession,
  CreatePreferenceRequest,
  CreatePreferenceResponse,
} from "./types";

/**
 * Starts a checkout for the given item and returns the gateway URL to
 * redirect the buyer to. Currently backed by Mercado Pago Checkout Pro;
 * the rest of the app only depends on the `CheckoutSession` shape.
 */
export const createCheckoutSessionAction = async (
  item: CheckoutItemInput
): Promise<ActionResult<CheckoutSession>> => {
  try {
    const body: CreatePreferenceRequest = {
      product_id: item.productId,
      title: item.title,
      unit_price: item.amount,
      quantity: item.quantity ?? 1,
    };

    const { data } = await requestHandler<CreatePreferenceResponse>({
      url: ENDPOINT.PAYMENTS_CREATE_PREFERENCE,
      method: "POST",
      body,
    });

    if (!data?.init_point) {
      return actionFailure("La pasarela de pago no devolvió una URL de pago");
    }

    return actionSuccess(
      { checkoutUrl: data.init_point, externalId: data.preference_id },
      "Sesión de pago creada"
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return actionFailure(
      "No pudimos iniciar el pago. Inténtalo de nuevo en unos minutos.",
      error
    );
  }
};
