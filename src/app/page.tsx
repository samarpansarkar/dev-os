import { DashboardLayout } from "@/layouts/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Dashboard" 
        description="Welcome to your DevOS workspace. Overview of your recent activity and projects."
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        }
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Placeholder Stat Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Active Projects</h3>
            <div className="mt-2 text-2xl font-bold">12</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <EmptyState 
          icon={<LayoutDashboard className="w-10 h-10 text-muted-foreground/50" />}
          title="No recent activity" 
          description="You haven't interacted with any projects or environments recently. Create a new project to get started."
          action={
            <Button variant="outline" className="mt-4">
              Explore templates
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  );
}
