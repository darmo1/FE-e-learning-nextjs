import Link from "next/link";
import { ReactNode } from "react";
import { CheckCircle, Clock, XCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { PaymentReturnParams } from "@/services/payments/types";

export type PaymentStatusVariant = "success" | "failure" | "pending";

const VARIANT_STYLES: Record<
  PaymentStatusVariant,
  { icon: LucideIcon; iconClass: string; iconBgClass: string }
> = {
  success: {
    icon: CheckCircle,
    iconClass: "text-green-600",
    iconBgClass: "bg-green-50",
  },
  failure: {
    icon: XCircle,
    iconClass: "text-red-600",
    iconBgClass: "bg-red-50",
  },
  pending: {
    icon: Clock,
    iconClass: "text-amber-600",
    iconBgClass: "bg-amber-50",
  },
};

const DETAIL_LABELS: Partial<Record<keyof PaymentReturnParams, string>> = {
  payment_id: "ID de pago",
  status: "Estado",
  external_reference: "Referencia",
};

type PaymentStatusCardProps = {
  variant: PaymentStatusVariant;
  title: string;
  description: string;
  details?: PaymentReturnParams;
  ctaHref?: string;
  ctaLabel?: string;
  /** Extra content rendered inside the card (e.g. confetti overlay). */
  children?: ReactNode;
};

export const PaymentStatusCard = ({
  variant,
  title,
  description,
  details,
  ctaHref = ROUTES.DASHBOARD,
  ctaLabel = "Ir a mi dashboard",
  children,
}: PaymentStatusCardProps) => {
  const { icon: Icon, iconClass, iconBgClass } = VARIANT_STYLES[variant];

  const detailRows = Object.entries(DETAIL_LABELS).filter(
    ([key]) => details?.[key as keyof PaymentReturnParams]
  );

  return (
    <div className="flex grow items-center justify-center p-4 md:p-8">
      <Card className="relative w-full max-w-md overflow-hidden border border-zinc-200 shadow-lg">
        {children}

        <CardHeader className="border-b border-zinc-100 pb-6 text-center">
          <div
            className={cn(
              "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full p-2",
              iconBgClass
            )}
          >
            <Icon className={cn("h-6 w-6", iconClass)} />
          </div>
          <h1 className="text-xl font-medium text-black">{title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </CardHeader>

        {detailRows.length > 0 && (
          <CardContent className="space-y-2 pt-6">
            {detailRows.map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2"
              >
                <span className="text-xs font-medium text-zinc-500">
                  {label}
                </span>
                <span className="text-xs text-zinc-700">
                  {details?.[key as keyof PaymentReturnParams]}
                </span>
              </div>
            ))}
          </CardContent>
        )}

        <CardFooter className="flex flex-col gap-3 pt-4">
          <Button className="group w-full" asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          <Button variant="link" size="sm" className="font-normal" asChild>
            <Link href={ROUTES.HOME}>Volver al inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
