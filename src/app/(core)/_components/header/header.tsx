import { Container } from "@/components/common/containter";
import { v4 as uuid } from "uuid";
import { Play } from "lucide-react";
import Link from "next/link";
import { getCookie } from "../../../../../utils/cookies";
import { Conditional } from "@/components/common/conditional";
import { LogoutBtn } from "./logout-btn";
import { Suspense } from "react";
type MenuProps = { name: string; href: string }[];

export const Header = async () => {
  const token = await getCookie("access_token");
  const isLogged = !!token;

  const menuLogged: MenuProps = [
   
    { name: "Mi cuenta", href: "/auth" },
  ];

  const menuNotLogged: MenuProps = [
    { name: "Precios", href: "/#price" },
    { name: "Registrarse", href: "/auth?register=true" },
    { name: "Login", href: "/auth" },
  ];

  const menu: MenuProps = isLogged ? menuLogged : menuNotLogged;

  return (
    <div className="bg-black py-3">
      <Container className="text-white bg-black/50">
        <header className="flex justify-between items-center">
          <Link href={isLogged ? "/home" : "/"} >
            <div className="flex justify-center items-center cursor-pointer">
              <Play />
              <span className="text-lg font-medium mx-2">Learn Streamer</span>
            </div>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {menu.map(({ href, name }) => (
                <Link href={href} key={uuid()}>
                  <li>{name}</li>
                </Link>
              ))}

             <Suspense fallback={<div className="w-4 h-4 animate-pulse bg-gray-200 rounded-full">cargando...</div>}>
             <Conditional test={isLogged}>
                <LogoutBtn />
              </Conditional>
             </Suspense>
            </ul>
          </nav>
        </header>
      </Container>
    </div>
  );
};
