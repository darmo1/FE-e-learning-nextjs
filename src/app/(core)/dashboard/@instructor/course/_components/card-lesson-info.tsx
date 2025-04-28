import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VideoIcon } from "lucide-react";
import React from "react";

export const CardLessonInfo = ({
  title,
  description,
  is_free,
}: {
  title: string;
  description?: string;
  is_free: boolean;
}) => {
  return (
    <Card className="border border-gray-200 my-2 px-6">
      <div className="flex-1 mb-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {+1}
          </span>
          <h5 className="text-xl font-semibold">{title}</h5>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
        <Badge variant="outline" className="flex items-center gap-1">
          <VideoIcon  className="w-12 h-12"/>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          {is_free ? "free" : "payment"}
        </Badge>
      </div>
    </Card>
  );
};
