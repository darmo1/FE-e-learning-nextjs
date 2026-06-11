"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { regenerateInviteTokenAction } from "@/services/companies/actions";
import type { Company } from "@/services/companies/types";
import { Check, Copy, Loader2, RefreshCw } from "lucide-react";

type InviteLinkPanelProps = {
  company: Company;
};

export const InviteLinkPanel = ({ company }: InviteLinkPanelProps) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const inviteUrl =
    typeof window === "undefined"
      ? `/empresa/${company.invite_token}`
      : `${window.location.origin}/empresa/${company.invite_token}`;

  const copy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerate = async () => {
    if (
      !window.confirm(
        "El link actual dejará de funcionar y nadie podrá registrarse con él. ¿Regenerar?"
      )
    ) {
      return;
    }
    setRegenerating(true);
    await regenerateInviteTokenAction(company.id);
    setRegenerating(false);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-gray-900">Link de invitación</h2>
        <p className="text-sm text-gray-500">
          Compártelo con la empresa: sus colaboradores se registran con él
          mientras haya cupos.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <code className="block overflow-x-auto whitespace-nowrap rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
          {inviteUrl}
        </code>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={copy}>
            {copied ? (
              <Check className="mr-2 h-4 w-4 text-green-600" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copiado" : "Copiar link"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={regenerate}
            disabled={regenerating}
          >
            {regenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Regenerar (revoca el actual)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
