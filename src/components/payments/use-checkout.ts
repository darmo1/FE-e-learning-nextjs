"use client";

import { useCallback, useState } from "react";
import { createCheckoutSessionAction } from "@/services/payments/actions";
import type { CheckoutItemInput } from "@/services/payments/types";

/**
 * Client-side checkout flow: creates a payment session through the server
 * action and redirects the buyer to the gateway. Exposes pending/error state
 * so any trigger (button, post-register flow, etc.) can reuse it.
 */
export const useCheckout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = useCallback(async (item: CheckoutItemInput) => {
    setIsPending(true);
    setError(null);

    const result = await createCheckoutSessionAction(item);

    if (!result.success) {
      setError(result.message);
      setIsPending(false);
      return;
    }

    // Keep isPending true: the browser is about to navigate away.
    window.location.href = result.data.checkoutUrl;
  }, []);

  return { startCheckout, isPending, error };
};
