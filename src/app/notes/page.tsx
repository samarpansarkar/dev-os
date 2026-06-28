import { DashboardLayout } from "@/layouts/dashboard-layout";
import { NotesClient } from "@/components/notes/notes-client";

export default function NotesPage() {
  return (
    <DashboardLayout>
      <NotesClient />
    </DashboardLayout>
  );
}
