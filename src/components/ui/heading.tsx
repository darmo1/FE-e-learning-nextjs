type HeadingProps = {
  title: string;
  description: string;
  className?: string;
};

export function Heading({ title, description, className }: HeadingProps) {
  return (
    <div className="grid gap-1">
      <h1 className={`${className} text-2xl font-bold tracking-tight`}>
        {title}
      </h1>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}
