export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
