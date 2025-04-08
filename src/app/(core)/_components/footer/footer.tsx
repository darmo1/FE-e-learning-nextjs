import { Container } from "@/components/common/containter";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-black">
      <Container className="text-white mb-0 m-auto w-full">
        <footer className="">
          <div className="flex justify-between items-center py-4 border-b border-gray-700">
            <ul className="flex gap-4">
              <Link href="/">
                <li>Inicio</li>
              </Link>
              <Link href="/">
                <li>Términos y condiciones</li>
              </Link>
              <Link href="/">
                <li>FAQ</li>
              </Link>
              <Link href="/">
                <li>Contáctenos</li>
              </Link>
              <Link href="/">
                <li>Instructor</li>
              </Link>
            </ul>
            <div className="flex gap-4 ">
              <div>X</div>
              <div>Youtube</div>
            </div>
          </div>
          <div>
            <p className="text-center text-sm text-gray-400 py-4">
              Todos los derechos reservados. Hecho con ❤️ para el mundo
            </p>
          </div>
        </footer>
      </Container>
    </div>
  );
};
