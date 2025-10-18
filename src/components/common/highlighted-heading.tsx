import { cn } from "@/lib/utils";
import clsx from "clsx";

interface HighlightedHeadingProps {
  before?: string;
  highlight: string;
  after?: string;
  subtitle?: string;
  className?: string;
  classNameSubtitle?: string;
  highlightClassName?: string;
}

export default function HighlightedHeading({
  before = "",
  highlight,
  after = "",
  subtitle,
  className,
  classNameSubtitle,
  highlightClassName,
}: HighlightedHeadingProps) {
  return (
    <div className="container">
      <div className="flex flex-col   ">
        <h1 className={cn("font-bold tracking-tighter text-xl", className, "")}>
          {before}{" "}
          <span
            className={cn(
              "relative inline-block",
              "before:absolute before:inset-x-0 before:-bottom-1 before:h-3 before:bg-yellow/30 before:rounded-sm",
              highlightClassName
            )}
          >
            {highlight}
          </span>
          {after}
        </h1>
        {subtitle && (
          <p
            className={clsx(
              classNameSubtitle,
              "max-w-[700px] text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
