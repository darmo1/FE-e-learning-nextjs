export const Container = ({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return <div className={`${className} w-screen mx-auto max-w-7xl grow`}>{children}</div>;
};
