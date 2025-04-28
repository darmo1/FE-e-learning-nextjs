"use client";
import { Clock, Edit2, Video } from "lucide-react";
import { Button } from "../ui/button";
import { LessonsProps } from "@/app/(core)/dashboard/course/types";
import { useState } from "react";

type LessonViewCard = LessonsProps & {
  onClick: (id: number) => void;
};

export const LessonViewCard = ({
  id,
  title,
  video_url,
  onClick,
  description,
}: LessonViewCard & {  }) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="p-6">
      <div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-3">
            <div className={``}>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {60}
              </p>
            </div>
          </div>
    
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onClick(Number(id))}
          >
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        {true && (
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowVideo(!showVideo)}
            >
              <Video className="h-4 w-4" />
              {showVideo ? "Hide Video" : "Show Video"}
            </Button>

            {showVideo && video_url && (
              <div className="mt-4 aspect-video">
                <iframe
                  className="w-full h-full rounded-md"
                  src={video_url}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
