import { getAnalyticsSummaryCoursesByInstructor } from "@/services/analytics/action";
import { BookOpen, Users } from "lucide-react";

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">{label}</p>
      <Icon className="h-4 w-4 text-gray-400" />
    </div>
    <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-gray-900">
      {value}
    </p>
  </div>
);

export const SummaryBar = async () => {
  const { total_courses, total_students } =
    (await getAnalyticsSummaryCoursesByInstructor()) ?? {
      total_courses: 0,
      total_students: 0,
    };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Cursos activos" value={total_courses} icon={BookOpen} />
      <StatCard
        label="Estudiantes totales"
        value={total_students}
        icon={Users}
      />
    </div>
  );
};
