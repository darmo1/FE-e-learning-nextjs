export default function RootLayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full grow flex-col">{children}</div>;
}
