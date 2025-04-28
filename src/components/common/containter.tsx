export const Container = ({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return <div className={`${className} flex flex-col max-w-7xl grow mx-auto w-full`}>{children}</div>;
};
