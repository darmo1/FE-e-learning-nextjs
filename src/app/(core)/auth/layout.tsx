
export default function RootLayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex flex-col md:flex-row py-6 ">
      {children}
    </div>
  );
}
