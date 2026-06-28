import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Lock, Download, Upload, Plus, Filter, Copy, Eye, EyeOff, Trash2, History, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VaultPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto bg-background/50 p-6 lg:p-10 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--color-primary),_transparent_70%)] -z-10"></div>
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-8 h-8 text-success" />
              <h2 className="text-4xl font-bold text-foreground leading-none tracking-tight">Environment Vault</h2>
            </div>
            <p className="text-muted-foreground">Securely manage and sync your application secrets and .env files.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-card/50 backdrop-blur-sm">
              <Download className="w-4 h-4 mr-2" /> Import
            </Button>
            <Button variant="outline" className="bg-card/50 backdrop-blur-sm">
              <Upload className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> New Secret
            </Button>
          </div>
        </div>

        {/* Environment Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-border pb-4">
          <div className="flex gap-8 font-bold text-xs uppercase tracking-wider">
            <button className="text-primary border-b-2 border-primary pb-4 relative top-[17px]">Production</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors pb-4 relative top-[17px]">Staging</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors pb-4 relative top-[17px]">Local</button>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                className="w-full bg-[#09090B] border border-border rounded pl-9 pr-3 py-1.5 font-mono text-sm text-foreground focus:border-primary focus:outline-none transition-all" 
                placeholder="Filter keys..." 
                type="text" 
              />
            </div>
          </div>
        </div>

        {/* Secrets List */}
        <div className="bg-card/40 backdrop-blur-md rounded-xl border border-border overflow-hidden mb-12 shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-border bg-muted/30 font-bold text-xs tracking-wider uppercase text-muted-foreground">
            <div>Key</div>
            <div>Value</div>
            <div className="text-right w-24">Actions</div>
          </div>
          
          {/* List Items */}
          <div className="flex flex-col">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-border items-center hover:bg-muted/50 transition-colors group">
              <div className="font-mono text-sm text-cyan-400">DATABASE_URL</div>
              <div className="relative group/value cursor-pointer">
                <div className="font-mono text-sm text-muted-foreground truncate pr-8 bg-[#09090B] p-1.5 rounded border border-transparent group-hover/value:border-border transition-colors">
                  postgres://user:••••••••••••••••@db.production.example.com:5432/main
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Copy className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-border items-center hover:bg-muted/50 transition-colors group">
              <div className="font-mono text-sm text-cyan-400">API_KEY_STRIPE</div>
              <div className="relative group/value cursor-pointer">
                <div className="font-mono text-sm text-muted-foreground truncate pr-8 bg-[#09090B] p-1.5 rounded border border-transparent group-hover/value:border-border transition-colors">
                  sk_live_••••••••••••••••••••••••••••••
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Copy className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-border items-center bg-muted/20 hover:bg-muted/50 transition-colors group">
              <div className="font-mono text-sm text-cyan-400">REDIS_HOST</div>
              <div className="relative group/value cursor-pointer">
                <div className="font-mono text-sm text-foreground truncate pr-8 bg-[#09090B] p-1.5 rounded border border-primary/50 transition-colors">
                  cache-prod-01.internal.net
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 w-24 opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Copy className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary/80"><EyeOff className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 items-center hover:bg-muted/50 transition-colors group">
              <div className="font-mono text-sm text-cyan-400">AWS_REGION</div>
              <div className="relative group/value cursor-pointer">
                <div className="font-mono text-sm text-muted-foreground truncate pr-8 bg-[#09090B] p-1.5 rounded border border-transparent group-hover/value:border-border transition-colors">
                  us-east-1
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Copy className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <History className="text-primary w-5 h-5" /> Access Audit Log
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4 py-2 border-b border-border/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">Sarah Jenkins</span> revealed <span className="font-mono text-xs text-cyan-400 bg-muted px-1 rounded">API_KEY_STRIPE</span>
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">Just now • 192.168.1.42</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-2 border-b border-border/50">
                <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] text-muted-foreground">CI</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">CI/CD Pipeline</span> accessed <span className="font-mono text-xs text-cyan-400 bg-muted px-1 rounded">DATABASE_URL</span>
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">10 mins ago • System Action</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Vault Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Environment</span>
                  <span className="font-mono text-xs text-success bg-success/10 px-2 py-1 rounded border border-success/20 font-bold uppercase tracking-wider">Production</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Secrets</span>
                  <span className="font-mono text-base text-foreground font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="font-mono text-xs text-muted-foreground">Today, 09:41 AM</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-background border border-border rounded-lg">
              <div className="flex items-center gap-2 text-warning mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wider">Security Alert</span>
              </div>
              <p className="text-sm text-muted-foreground">2 secrets have not been rotated in over 90 days.</p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
