import { Container } from "@/components/common/containter";
import { Play } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Cursos", href: "/auth" },
  { label: "Empresas", href: "/#empresas" },
  { label: "Términos y condiciones", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black">
      <Container>
        <div className="flex flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
                <Play className="h-3.5 w-3.5 fill-black text-black" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">
                GoProClass
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Cursos en video para profesionales y equipos que quieren crecer.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 px-4 py-5">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} GoProClass. Todos los derechos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};
