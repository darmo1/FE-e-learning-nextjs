import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const SectionHero = () => {
  return (
    <div className="grow flex flex-col items-center justify-center p-4 ">
      <Badge
        className=" rounded-md px-3 py-1 text-sm text-white"
        variant="outline"
      >
        New courses available ✨
      </Badge>
      <h1 className="my-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white text-balance text-center md:leading-[1.4] ">
        Cursos para{" "}
        <span className="relative inline-block">
          {" "}
          estudiantes{" "}
          <span className="bg-blue-400 absolute  -bottom-10 -right-10 inline-block -rotate-2 text-5xl ">
            modernos
          </span>
        </span>
      </h1>

      <p className="my-16 text-balance text-center leading-normal text-gray-500 sm:text-xl sm:leading-8">
        Listo para tomar clases 👩‍💻👨‍💻. Cursos para aprender nuevas habilidades.
        Todos los cursos diseñados con simplicidad y eficiencia en mente 🧠
      </p>
      <Link href="/auth">
        <button className="border-2 border-dashed cursor-pointer rounded-md  px-6 py-1 text-white font-semibold">
          Registrate <ArrowRightIcon className="inline-block h-5 w-5" />
        </button>
      </Link>
    </div>
  );
};
