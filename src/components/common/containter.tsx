export const Container = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return (
    <div className={`${className} flex flex-col max-w-6xl grow mx-5 md:mx-auto w-full`}>
      {children}
    </div>
  );
};
