import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCompanies } from "@/services/companies/actions";
import { Building2, Users } from "lucide-react";
import Link from "next/link";
import { CreateCompanyForm } from "./_components/create-company-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data: companies } = await getCompanies();

  return (
    <div className="flex flex-col gap-6 py-4">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
        <p className="text-sm text-gray-500">
          Administra los acuerdos corporativos: cupos, cursos habilitados y
          metas de capacitación.
        </p>
      </header>

      <CreateCompanyForm />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {companies.length === 0 && (
          <Card className="md:col-span-2 xl:col-span-3">
            <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-gray-500">
              <Building2 className="h-8 w-8" />
              Aún no hay empresas. Crea la primera con el formulario de arriba.
            </CardContent>
          </Card>
        )}

        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/dashboard/companies/${company.id}`}
            className="group"
          >
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {company.name}
                </h2>
                <Badge variant={company.is_active ? "default" : "destructive"}>
                  {company.is_active ? "Activa" : "Inactiva"}
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {company.seats_used}/{company.max_seats} cupos
                </span>
                <span>Meta: {company.completion_goal_pct}%</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
