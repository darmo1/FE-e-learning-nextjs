import { cn } from "@/lib/utils"

interface HighlightedHeadingProps {
  before?: string
  highlight: string
  after?: string
  subtitle?: string
  className?: string
  highlightClassName?: string
}

export default function HighlightedHeading({
  before = "",
  highlight,
  after = "",
  subtitle,
  className,
  highlightClassName,
}: HighlightedHeadingProps) {
  return (
    <section className="w-full bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col   ">
          <h1 className={cn("font-bold tracking-tighter sm:text-4xl  ", className)}>
            {before}{" "}
            <span
              className={cn(
                "relative inline-block",
                "before:absolute before:inset-x-0 before:-bottom-1 before:h-3 before:bg-yellow/30 before:rounded-sm",
                highlightClassName,
              )}
            >
              {highlight}
            </span>{" "}
            {after}
          </h1>
          {subtitle && <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
