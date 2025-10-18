'use client'
export const dynamic = "force-dynamic";

import {
  SectionFeatures,
  SectionHero,
  SectionPricing,
} from "./(core)/_components/home";
import { redirect } from "next/navigation";
import { useUser } from "./user-context";

export default function Page() {
  const { isLogged, role } = useUser();
  console.log("User role:", role, "Is logged in:", isLogged);


  if (isLogged && role === "admin") {
    return redirect("/admin");
  }
  if (isLogged && role === "instructor") {
    return redirect("/dashboard");
  }

  if (isLogged && role === "student") {
    return redirect("/dashboard");
  }

  return (
        <main className="  mx-auto">
          <SectionHero />
          <SectionFeatures />
          <SectionPricing />
        </main>


  );
}
