import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { fetchUser } from "@/services/users/actions";
import { ReactNode } from "react";
import { UserProvider } from "./user-context";

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
  const { role } = data;

  

  return (
    <UserProvider role={role}>
      <div className="flex min-h-screen flex-col md:flex-row bg-white">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8">
          {role === "instructor" ? instructor : null}
          {role === "admin" ? admin : null}
          {role === "student" ? student : null}
          {children }
        </main>
      </div>
    </UserProvider>
  );
}
