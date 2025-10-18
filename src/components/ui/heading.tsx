import { Conditional } from "../common/conditional";

type HeadingProps = {
  title: string;
  description: string;
  className?: string;
};

export function Heading({ title, description, className }: HeadingProps) {
  return (
    <div className="grid">
      <h1 className={`${className} text-2xl font-bold tracking-tight`}>
        {title}
      </h1>
      <Conditional test={Boolean(description)}>
        <p className="text-gray-600 mb-4">{description}</p>
      </Conditional>
    </div>
  );
}
