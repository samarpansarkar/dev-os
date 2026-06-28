import { DashboardLayout } from "@/layouts/dashboard-layout";
import { CommandsClient } from "@/components/commands/commands-client";

export default function CommandLibraryPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col h-full bg-background relative animate-in fade-in duration-500">
        <CommandsClient />
      </div>
    </DashboardLayout>
  );
}
