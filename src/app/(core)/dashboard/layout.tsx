export const dynamic = "force-dynamic";

import { AccountInactiveNotice } from "@/components/dashboard/account-inactive-notice";
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
  const { role, isLogged, full_name: fullName, is_active: isActive, email } = data;

  // Cuenta sin verificar (o desactivada): bloquea el dashboard hasta activarla
  if (isLogged && !isActive) {
    return (
      <div className="flex w-full grow items-center justify-center bg-white px-6 py-16">
        <AccountInactiveNotice email={email} />
      </div>
    );
  }

  return (
    <UserProvider role={role} isLogged={isLogged} fullName={fullName}>
      <div className="flex w-full grow flex-col bg-white md:flex-row">
        <DashboardNav />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <BreadcrumbMenu role={role} />
            {role === "instructor" ? instructor : null}
            {role === "admin" ? admin : null}
            {role === "student" ? (
              <>
                {student}
                {children}
              </>
            ) : null}
          </div>
        </main>
      </div>
    </UserProvider>
  );
}
