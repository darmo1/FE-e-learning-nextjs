import { Conditional } from "../common/conditional";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  instructor: "Instructor",
  student: "Estudiante",
};

export const ProfileBadge = ({ role }: { role?: string }) => {
  return (
    <Conditional test={!!role}>
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-sm font-medium text-gray-900">
          {ROLE_LABELS[role ?? ""] ?? role}
        </span>
      </div>
    </Conditional>
  );
};
