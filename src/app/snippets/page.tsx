import { SnippetsClient } from "@/components/snippets/snippets-client";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export const metadata = {
  title: 'Snippets | DevOS',
  description: 'Manage and view your code snippets.',
};

export default function SnippetsPage() {
  return (
    <DashboardLayout>
      <SnippetsClient />
    </DashboardLayout>
  );
}
