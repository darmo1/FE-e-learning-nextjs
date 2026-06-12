import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyCoursesCardProps = {
  title: string;
  description: string;
  /** CTA opcional, ej. { label: "Explorar cursos", href: "/" } */
  action?: { label: string; href: string };
};

export function EmptyCoursesCard({
  title,
  description,
  action,
}: EmptyCoursesCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white">
        <BookOpen className="h-5 w-5 text-gray-400" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      {action && (
        <Button asChild size="sm" className="mt-5">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
