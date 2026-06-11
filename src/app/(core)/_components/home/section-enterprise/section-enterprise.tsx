import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { enterpriseFeatures } from "../constants";

const CONTACT_EMAIL = "danilomorales110@gmail.com";

export const SectionEnterprise = () => {
  return (
    <section className="py-20" id="empresas">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-[58rem] text-center">
          <Badge
            className="mb-4 rounded-full border-green-400/40 bg-green-400/10 px-4 py-1 text-sm text-green-300"
            variant="outline"
          >
            <Building2 className="mr-1 inline-block h-4 w-4" />
            Para empresas
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Capacita a tu equipo con cursos seleccionados
          </h2>
          <p className="mb-12 text-gray-400 sm:text-lg">
            Habilitamos los cursos que tu organización necesita, con cupos para
            tus colaboradores y reportes de cumplimiento de objetivos.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {enterpriseFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="border-gray-800 bg-gray-900/60 backdrop-blur"
            >
              <CardContent className="p-6">
                <CheckCircle2 className="mb-3 h-6 w-6 text-green-400" />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-green-500 px-8 text-base font-semibold text-white hover:bg-green-400"
          >
            <Link
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Quiero capacitar a mi equipo"
              )}`}
            >
              <Mail className="mr-2 h-5 w-5" />
              Hablemos de tu equipo
            </Link>
          </Button>
          <p className="text-sm text-gray-500">
            ¿Tu empresa ya tiene un acuerdo? Pide el link de invitación a tu
            administrador.
          </p>
        </div>
      </div>
    </section>
  );
};
