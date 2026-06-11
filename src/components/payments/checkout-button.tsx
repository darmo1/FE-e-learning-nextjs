"use client";

import { ReactNode } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CheckoutItemInput } from "@/services/payments/types";
import { useCheckout } from "./use-checkout";

type CheckoutButtonProps = CheckoutItemInput & {
  className?: string;
  children?: ReactNode;
};

/**
 * Payment CTA: creates a checkout session for the item and redirects the
 * buyer to the payment gateway (currently Mercado Pago Checkout Pro).
 */
export const CheckoutButton = ({
  productId,
  amount,
  title,
  quantity,
  className,
  children,
}: CheckoutButtonProps) => {
  const { startCheckout, isPending, error } = useCheckout();

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        className={cn("w-full", className)}
        onClick={() => startCheckout({ productId, amount, title, quantity })}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirigiendo al pago…
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            {children ?? `Pagar $${amount}`}
          </>
        )}
      </Button>

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-center text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
};
