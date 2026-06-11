import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Building2 } from "lucide-react";
import Link from "next/link";

export const SectionHero = () => {
  return (
    <section className="flex grow flex-col items-center justify-center px-4 py-24 text-center md:py-32">
      <Badge
        className="rounded-full border-blue-400/40 bg-blue-400/10 px-4 py-1 text-sm text-blue-300"
        variant="outline"
      >
        ✨ Nuevos cursos disponibles
      </Badge>

      <h1 className="mx-auto my-6 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.15]">
        Aprende habilidades que{" "}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          transforman tu carrera
        </span>
      </h1>

      <p className="mx-auto max-w-2xl text-balance leading-relaxed text-gray-400 sm:text-xl sm:leading-8">
        Cursos prácticos creados por instructores expertos, con seguimiento de
        progreso real. Para personas que quieren crecer y para empresas que
        quieren capacitar a sus equipos.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="bg-blue-500 px-8 text-base font-semibold text-white hover:bg-blue-400"
        >
          <Link href="/auth">
            Explorar cursos
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-gray-700 bg-transparent px-8 text-base font-semibold text-gray-200 hover:bg-gray-800 hover:text-white"
        >
          <Link href="#empresas">
            <Building2 className="mr-2 h-5 w-5" />
            Soluciones para empresas
          </Link>
        </Button>
      </div>
    </section>
  );
};
