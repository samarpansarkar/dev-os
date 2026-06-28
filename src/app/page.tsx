import { DashboardLayout } from "@/layouts/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Overview" 
        description="Welcome back. Systems are operating nominally."
        actions={
          <span className="px-3 py-1 rounded bg-surface-container border border-border font-mono text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            API: Operational
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)]">
        
        {/* Recent Projects */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-card to-muted opacity-50 pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-center mb-4 border-b border-border pb-2">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">Recent Projects</h3>
            <button className="text-primary hover:text-primary/80 text-sm transition-colors">View All</button>
          </div>
          <div className="relative z-10 flex-1 overflow-y-auto space-y-1">
            {[
              { title: "Nexus UI Framework", updated: "2h ago by @sarah", status: "Production", statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
              { title: "Core Data Pipeline", updated: "5h ago by @alex", status: "Staging", statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
              { title: "Auth Service v2", updated: "1d ago by @david", status: "Development", statusColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" }
            ].map((proj, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded transition-colors group/item cursor-pointer border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                    {/* Placeholder Icon */}
                    <div className="w-4 h-4 bg-primary/20 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{proj.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">Updated {proj.updated}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 border rounded font-mono text-xs ${proj.statusColor}`}>{proj.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-center mb-4 border-b border-border pb-2">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">System Health</h3>
          </div>
          <div className="relative z-10 flex-1 flex flex-col gap-2">
            {[
              { label: "Vercel Deployments", stat: "12/12 Succ", color: "bg-emerald-500" },
              { label: "AWS US-East-1", stat: "99.99%", color: "bg-emerald-500" },
              { label: "Postgres Primary", stat: "Load 85%", color: "bg-amber-500 animate-pulse" }
            ].map((health, i) => (
              <div key={i} className="bg-muted/50 border border-border p-2 rounded flex items-center justify-between">
                <span className="text-sm font-medium">{health.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${health.color}`}></span>
                  <span className="font-mono text-xs text-muted-foreground">{health.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Co-Pilot */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col relative">
          <div className="relative z-10 flex justify-between items-center mb-4 border-b border-border pb-2">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">AI Co-Pilot</h3>
          </div>
          <div className="relative z-10 flex-1 flex flex-col gap-2 overflow-y-auto">
            {[
              { msg: '"Optimize this React useEffect..."', time: "Today, 10:42 AM" },
              { msg: '"Generate SQL migration..."', time: "Yesterday, 3:15 PM" },
              { msg: '"Explain this legacy script"', time: "Oct 24, 11:20 AM" }
            ].map((chat, i) => (
              <div key={i} className="p-2 bg-muted/30 border border-border rounded hover:border-primary/50 transition-colors cursor-pointer group">
                <p className="text-sm line-clamp-1 group-hover:text-primary transition-colors">{chat.msg}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{chat.time}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-1.5 border border-border rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm font-medium">New Chat</button>
        </div>
        
        {/* Action Items */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col relative">
          <div className="relative z-10 flex justify-between items-center mb-4 border-b border-border pb-2">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">Action Items</h3>
            <button className="text-primary hover:text-primary/80 text-sm transition-colors">Go to Board</button>
          </div>
          <div className="relative z-10 flex gap-4 overflow-x-auto pb-2">
            {[
              { title: "Fix memory leak in edge functions", id: "ID-4921", due: "Due Today", prio: "High Prio", prioColor: "text-red-500 bg-red-500/10 border-red-500/20" },
              { title: "Implement OAuth 2.0 Flow", id: "ID-4933", due: "Due Tomorrow", prio: "Medium Prio", prioColor: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
            ].map((task, i) => (
              <div key={i} className="min-w-[280px] bg-muted/30 border border-border rounded-lg p-3 hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 border rounded text-[10px] uppercase font-bold tracking-wider ${task.prioColor}`}>{task.prio}</span>
                </div>
                <p className="font-semibold text-sm mb-1">{task.title}</p>
                <p className="font-mono text-xs text-muted-foreground mb-3">{task.id} • {task.due}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
