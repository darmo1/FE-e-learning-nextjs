import { redirect } from "next/navigation";
import {
  SectionFeatures,
  SectionHero,
  SectionPricing,
} from "./(core)/_components/home";
import { SectionCourses } from "./(core)/_components/home/section-courses";
import { getCookie } from "../../utils/cookies";
import { safeFetchUser } from "@/services/users/actions";
import { ROUTES } from "@/constants/routes";

export const dynamic = "force-dynamic";

export default async function Page() {
  const token = await getCookie("access_token");

  if (token) {
    const { data } = await safeFetchUser();
    if (data?.role) redirect(ROUTES.DASHBOARD);
  }

  return (
    <main className="mx-auto">
      <SectionHero />
      <SectionCourses />
      <SectionFeatures />
      <SectionPricing />
    </main>
  );
}
