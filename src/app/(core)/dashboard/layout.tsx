export const dynamic = "force-dynamic";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { fetchUser } from "@/services/users/actions";
import { ReactNode } from "react";
import { UserProvider } from "../../user-context";

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
  const { role, isLogged } = data;

  return (
    <UserProvider role={role} isLogged={isLogged}>
      <div className="flex min-h-screen w-full flex-col md:flex-row bg-white">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8">
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
