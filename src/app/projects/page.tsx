import { DashboardLayout } from "@/layouts/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Placeholder data
const projects = [
  { id: 1, name: "Web App", status: "Active", updated: "2h ago" },
  { id: 2, name: "Mobile API", status: "Maintenance", updated: "1d ago" },
  { id: 3, name: "Data Pipeline", status: "Archived", updated: "1w ago" },
];

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Projects" 
        description="Manage all your active and archived projects across the organization."
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        }
      />
      
      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          {/* Placeholder for filters/search */}
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full max-w-sm px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="divide-y divide-border">
          {projects.map(p => (
            <div key={p.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-muted-foreground">Updated {p.updated}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  p.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                  p.status === "Maintenance" ? "bg-amber-500/10 text-amber-500" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
