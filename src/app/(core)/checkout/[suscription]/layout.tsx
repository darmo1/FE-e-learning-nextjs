import { Heading } from "@/components/ui/heading";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Heading
        title="Suscription"
        description="Bienvenido a la pagina de suscription"
      />
      <main className="grid md:grid-cols-2 gap-6 border">{children}</main>
    </section>
  );
}
