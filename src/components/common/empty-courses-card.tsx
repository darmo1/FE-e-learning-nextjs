import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyCoursesCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="w-full max-w-md my-4">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="bg-slate-100 p-3 rounded-full">
          <BookOpen className="h-8 w-8 text-slate-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
