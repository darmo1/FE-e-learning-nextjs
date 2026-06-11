import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getInviteInfo } from "@/services/companies/actions";
import { BookOpen, Building2, XCircle } from "lucide-react";
import { InviteRegisterForm } from "./_components/invite-register-form";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function EmpresaInvitePage({ params }: PageProps) {
  const { token } = await params;
  const invite = await getInviteInfo(token);

  if (!invite) {
    return (
      <main className="flex grow items-center justify-center px-4 py-24">
        <Card className="max-w-md border-gray-800 bg-gray-900/60 text-center">
          <CardContent className="p-8">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
            <h1 className="mb-2 text-xl font-semibold text-white">
              Invitación no válida
            </h1>
            <p className="text-sm text-gray-400">
              Este link de invitación no existe o fue revocado. Pide a tu
              empresa el link actualizado.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl grow flex-col items-center gap-10 px-4 py-16 lg:flex-row lg:items-start lg:justify-center">
      <section className="w-full max-w-md">
        <Badge
          className="mb-4 rounded-full border-green-400/40 bg-green-400/10 px-4 py-1 text-sm text-green-300"
          variant="outline"
        >
          <Building2 className="mr-1 inline-block h-4 w-4" />
          Acceso corporativo
        </Badge>
        <h1 className="mb-3 text-3xl font-bold text-white">
          {invite.company_name} te invita a capacitarte
        </h1>
        <p className="mb-6 text-gray-400">
          Crea tu cuenta con este link y accede sin costo a los cursos que tu
          empresa habilitó para ti.
        </p>

        {invite.courses.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Cursos habilitados
            </h2>
            <ul className="space-y-2">
              {invite.courses.map((title) => (
                <li
                  key={title}
                  className="flex items-center gap-2 text-gray-200"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-blue-400" />
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!invite.seats_available && (
          <p className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-300">
            Los cupos de tu empresa están completos. Contacta a tu
            administrador para ampliar el acuerdo.
          </p>
        )}
      </section>

      {invite.seats_available && (
        <Card className="w-full max-w-md border-gray-800 bg-gray-900/60">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Crea tu cuenta</h2>
            <p className="text-sm text-gray-400">
              Registro exclusivo para colaboradores de {invite.company_name}
            </p>
          </CardHeader>
          <CardContent>
            <InviteRegisterForm inviteToken={token} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
