"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Orientation = "vertical" | "horizontal";

const CourseCardContext = createContext<{ orientation: Orientation } | null>(
  null
);

const useCourseCard = () => {
  const context = useContext(CourseCardContext);
  if (!context) {
    throw new Error("CourseCard.* components must be used within <CourseCard>");
  }
  return context;
};

type CourseCardRootProps = {
  orientation?: Orientation;
  href?: string;
  className?: string;
  children: ReactNode;
};

const CourseCardRoot = ({
  orientation = "vertical",
  href,
  className,
  children,
}: CourseCardRootProps) => {
  const card = (
    <article
      className={cn(
        "group flex h-full overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:shadow-2xl",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {children}
    </article>
  );

  return (
    <CourseCardContext.Provider value={{ orientation }}>
      {href ? (
        <Link href={href} className="block h-full">
          {card}
        </Link>
      ) : (
        card
      )}
    </CourseCardContext.Provider>
  );
};

type CourseCardImageProps = {
  src: string | null;
  alt: string;
  className?: string;
  /** Overlay content rendered on top of the image (e.g. badges). */
  children?: ReactNode;
};

const CourseCardImage = ({
  src,
  alt,
  className,
  children,
}: CourseCardImageProps) => {
  const { orientation } = useCourseCard();
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden",
        orientation === "vertical" ? "h-52 w-full" : "h-full w-1/2",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200">
          <span className="text-sm text-gray-500">Sin imagen</span>
        </div>
      )}
      {children}
    </div>
  );
};

const CourseCardContent = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div className={cn("flex flex-1 flex-col gap-1 p-4", className)}>
    {children}
  </div>
);

const CourseCardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h2 className={cn("truncate text-lg font-semibold", className)}>{children}</h2>
);

const CourseCardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p className={cn("line-clamp-2 text-sm text-gray-600", className)}>
    {children}
  </p>
);

const CourseCardFooter = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn("mt-auto flex items-center justify-between pt-2", className)}
  >
    {children}
  </div>
);

const CourseCardCategory = ({ children }: { children: ReactNode }) => (
  <span className="text-sm text-blue-500">{children}</span>
);

const CourseCardPrice = ({ price }: { price?: number }) => {
  if (!price) return null;
  return <span className="text-lg font-bold">${price}</span>;
};

/**
 * Compound course card. Compose the pieces you need:
 *
 * ```tsx
 * <CourseCard href={`/course/${slug}/${id}`} orientation="vertical">
 *   <CourseCard.Image src={image_url} alt={title} />
 *   <CourseCard.Content>
 *     <CourseCard.Title>{title}</CourseCard.Title>
 *     <CourseCard.Description>{description}</CourseCard.Description>
 *     <CourseCard.Footer>
 *       <CourseCard.Category>{category}</CourseCard.Category>
 *       <CourseCard.Price price={price} />
 *     </CourseCard.Footer>
 *   </CourseCard.Content>
 * </CourseCard>
 * ```
 */
export const CourseCard = Object.assign(CourseCardRoot, {
  Image: CourseCardImage,
  Content: CourseCardContent,
  Title: CourseCardTitle,
  Description: CourseCardDescription,
  Footer: CourseCardFooter,
  Category: CourseCardCategory,
  Price: CourseCardPrice,
});
