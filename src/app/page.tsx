import { redirect } from "next/navigation";
import { getCookie } from "../../utils/cookies";
import {
  SectionFeatures,
  SectionHero,
  SectionPricing,
} from "./(core)/_components/home";
import { fetchUser } from "@/services/users/actions";

export default async function Page() {
  const token = await getCookie("access_token");

  if (token) {
    const { data } = await fetchUser();
    const { isLogged, role } = data;

    if (isLogged && role === "admin") {
      return redirect("/admin");
    }
    if (isLogged && role === "instructor") {
      return redirect("/dashboard");
    }

    if (isLogged && role === "student") {
      return redirect("/home");
    }
  }

  return (
    <main className=" md:max-w-3xl mx-auto">
      <SectionHero />
      <SectionFeatures />
      <SectionPricing />
    </main>
  );
}
