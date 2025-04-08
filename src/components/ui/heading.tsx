type HeadingProps = {
  title: string;
  description: string;
};

export function Heading({ title, description }: HeadingProps) {
  return (
    <div className="grid gap-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
