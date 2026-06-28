import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Terminal, Plus, Search, Play, Copy, Star, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommandLibraryPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-foreground tracking-tight">Command Library</h2>
              <p className="text-muted-foreground mt-2">Manage, run, and share your terminal commands and scripts.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Command
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search commands..." 
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Categories/Folders (Spans 3 cols) */}
            <div className="lg:col-span-3 space-y-2">
              <div className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mb-4 px-2">Collections</div>
              <button className="w-full text-left px-3 py-2 rounded-lg bg-card border-l-2 border-primary text-primary font-semibold text-sm flex items-center justify-between">
                <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Favorites</span>
                <span className="font-mono text-[10px] opacity-70">12</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground font-semibold text-sm transition-colors flex items-center justify-between">
                <span className="flex items-center gap-2"><History className="w-4 h-4" /> Recent</span>
                <span className="font-mono text-[10px] opacity-70">5</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground font-semibold text-sm transition-colors flex items-center justify-between">
                <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Docker</span>
                <span className="font-mono text-[10px] opacity-70">8</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground font-semibold text-sm transition-colors flex items-center justify-between">
                <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Kubernetes</span>
                <span className="font-mono text-[10px] opacity-70">15</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground font-semibold text-sm transition-colors flex items-center justify-between">
                <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Git Utils</span>
                <span className="font-mono text-[10px] opacity-70">22</span>
              </button>
            </div>

            {/* Commands List (Spans 9 cols) */}
            <div className="lg:col-span-9 space-y-4">
              
              {/* Command Card 1 */}
              <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Clean Docker Environment</h3>
                    <p className="text-sm text-muted-foreground mt-1">Removes all unused containers, networks, images, and volumes.</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                      <Play className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="bg-[#09090B] rounded-lg p-3 border border-border overflow-x-auto">
                  <code className="font-mono text-sm text-cyan-400">docker system prune -a --volumes -f</code>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="px-2 py-1 rounded bg-muted text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-bold">Docker</span>
                  <span className="px-2 py-1 rounded bg-muted text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-bold">Cleanup</span>
                </div>
              </div>

              {/* Command Card 2 */}
              <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Find Large Files</h3>
                    <p className="text-sm text-muted-foreground mt-1">Search current directory and subdirectories for files larger than 100MB.</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                      <Play className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="bg-[#09090B] rounded-lg p-3 border border-border overflow-x-auto">
                  <code className="font-mono text-sm text-cyan-400">find . -type f -size +100M -exec ls -lh {} \; | awk '{"{"} print $9 ": " $5 {"}"}'</code>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="px-2 py-1 rounded bg-muted text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-bold">Linux</span>
                  <span className="px-2 py-1 rounded bg-muted text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-bold">Disk Space</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
