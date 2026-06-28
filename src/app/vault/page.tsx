import { VaultClient } from "@/components/vault/vault-client";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export const metadata = {
  title: 'Environment Vault | DevOS',
  description: 'Securely manage and sync your application secrets and .env files.',
};

export default function VaultPage() {
  return (
    <DashboardLayout>
      <VaultClient />
    </DashboardLayout>
  );
}
