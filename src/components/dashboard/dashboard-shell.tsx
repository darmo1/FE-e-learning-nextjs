import { Button } from "../ui/button";
import { Heading } from "../ui/heading";


type DashboardShellProps = {
  children: React.ReactNode;    
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading title="Dashboard" description="Your personal dashboard" />
        <Button> Nuevo videos </Button>
      </div>
      {children}
    </div>
  );
}