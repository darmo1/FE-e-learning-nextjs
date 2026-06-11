import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getCompany,
  getCompanyCourses,
  getCompanyStats,
} from "@/services/companies/actions";
import { ArrowLeft, Download, Users } from "lucide-react";
import Link from "next/link";
import { CompanyCourseToggles } from "./_components/company-course-toggles";
import { CompanySettings } from "./_components/company-settings";
import { InviteLinkPanel } from "./_components/invite-link-panel";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const companyId = Number(id);

  const [{ data: company }, { data: stats }, { data: courses }] =
    await Promise.all([
      getCompany(companyId),
      getCompanyStats(companyId),
      getCompanyCourses(companyId),
    ]);

  return (
    <div className="flex flex-col gap-6 py-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/dashboard"
            className="mb-1 flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" /> Empresas
          </Link>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            {company.name}
            <Badge variant={company.is_active ? "default" : "destructive"}>
              {company.is_active ? "Activa" : "Inactiva"}
            </Badge>
          </h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            {company.seats_used}/{company.max_seats} cupos usados · Meta de
            finalización: {company.completion_goal_pct}%
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={`/api/admin/companies/${companyId}/report`} download>
            <Download className="mr-2 h-4 w-4" />
            Descargar informe CSV
          </a>
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <InviteLinkPanel company={company} />
        <CompanySettings company={company} />
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Cursos habilitados</h2>
          <p className="text-sm text-gray-500">
            Los trabajadores registrados acceden sin costo a los cursos
            habilitados.
          </p>
        </CardHeader>
        <CardContent>
          <CompanyCourseToggles companyId={companyId} courses={courses} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">
            Estadísticas por curso
          </h2>
          <p className="text-sm text-gray-500">
            Avance de los {stats.seats_used} colaboradores registrados frente a
            la meta del {stats.goal_pct}%.
          </p>
        </CardHeader>
        <CardContent>
          {stats.courses.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              Habilita cursos para empezar a medir el avance.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4 font-medium">Curso</th>
                    <th className="py-2 pr-4 font-medium">Inscritos</th>
                    <th className="py-2 pr-4 font-medium">Completados</th>
                    <th className="py-2 pr-4 font-medium">Avance promedio</th>
                    <th className="py-2 pr-4 font-medium">% Finalización</th>
                    <th className="py-2 font-medium">Meta</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.courses.map((course) => (
                    <tr key={course.course_id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {course.course_title}
                      </td>
                      <td className="py-3 pr-4">{course.enrolled}</td>
                      <td className="py-3 pr-4">{course.completed}</td>
                      <td className="py-3 pr-4">{course.avg_progress_pct}%</td>
                      <td className="py-3 pr-4">{course.completion_pct}%</td>
                      <td className="py-3">
                        {course.goal_met === null ? (
                          <Badge variant="outline">Sin inscritos</Badge>
                        ) : course.goal_met ? (
                          <Badge className="bg-green-600">Cumplida</Badge>
                        ) : (
                          <Badge variant="destructive">Pendiente</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
