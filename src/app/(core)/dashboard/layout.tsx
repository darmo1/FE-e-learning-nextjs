export const dynamic = "force-dynamic";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { fetchUser } from "@/services/users/actions";
import { ReactNode } from "react";
import { UserProvider } from "../../user-context";
import { BreadcrumbMenu } from "@/components/common/breadcrumb-menu";

export default async function DashboardLayout({
  children,
  admin,
  instructor,
  student,
}: {
  children: ReactNode;
  admin: ReactNode;
  student: ReactNode;
  instructor: ReactNode;
}) {

  const { data } = await fetchUser();
  const { role, isLogged, full_name: fullName} = data;

  return (
    <UserProvider role={role} isLogged={isLogged} fullName={fullName}>
      <div className="flex grow w-full flex-col md:flex-row bg-white">
      
        <DashboardNav />
        <main className="flex-1 mx-8 my-4">
            <BreadcrumbMenu role={role}/>
          {role === "instructor" ? instructor : null}
          {role === "admin" ? admin : null}
          {role === "student" ? (
            <>
              {student}
              {children}
            </>
          ) : null}
        </main>
      </div>
    </UserProvider>
  );
}
