import { ProjectsClient } from "@/components/projects/projects-client";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export const metadata = {
  title: 'Projects | DevOS',
  description: 'Manage your active repositories, tasks, and deployments.',
};

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsClient />
    </DashboardLayout>
  );
}
