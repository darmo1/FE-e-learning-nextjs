import { Container } from "@/components/common/containter";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-black">
      <Container className="text-white mb-0 m-auto w-full">
        <footer className="px-4">
          <div className="flex justify-between items-center py-4 border-b border-gray-700">
            <ul className="md:flex gap-4">
              <Link href="/">
                Inicio
              </Link>
              <Link href="/">
               Términos y condiciones
              </Link>
              <Link href="/">
                FAQ
              </Link>
              <Link href="/">
               Contáctenos
              </Link>
              <Link href="/">
                Instructor
              </Link>
            </ul>
            <div className="md:flex gap-4 ">
              <div>X</div>
              <div>Youtube</div>
            </div>
          </div>
          <div>
            <p className="text-center text-sm text-gray-400 py-4 text-balance">
              Todos los derechos reservados. Hecho con ❤️ para el mundo
            </p>
          </div>
        </footer>
      </Container>
    </div>
  );
};
