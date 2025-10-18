"use client";

import { useUser } from "@/app/user-context";
import { Heading } from "@/components/ui/heading";

export const HeadingUser = () => {
  const { fullName, role } = useUser();
  return ( 
    <Heading
      title={`Hola ${fullName}, Bienvenido al dashboard ${role ? 'de' : ''} ${role}`}
      description="Aqui puedes visualizar tus cursos"
    />
  );
};
