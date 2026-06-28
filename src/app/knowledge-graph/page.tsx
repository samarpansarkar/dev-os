import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Search, Filter, ZoomIn, ZoomOut, Maximize, Folder, Cpu, FileText, Bug, X, Info, Network, Terminal, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function KnowledgeGraphPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 relative bg-background overflow-hidden h-[calc(100vh-3.5rem)] flex">
        
        {/* Graph Canvas Area */}
        <div className="flex-1 relative bg-[#09090B] w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          
          {/* Connection Lines (Simulated for UI) */}
          <div className="absolute bg-border opacity-60 origin-top-left" style={{ width: '250px', height: '1px', top: '40%', left: '30%', transform: 'rotate(15deg)' }}></div>
          <div className="absolute bg-border opacity-60 origin-top-left" style={{ width: '180px', height: '1px', top: '40%', left: '30%', transform: 'rotate(-45deg)' }}></div>
          <div className="absolute bg-cyan-400 opacity-100 origin-top-left shadow-[0_0_8px_rgba(34,211,238,0.6)] z-0" style={{ width: '320px', height: '1px', top: '60%', left: '45%', transform: 'rotate(-20deg)' }}></div>
          <div className="absolute bg-border opacity-60 origin-top-left" style={{ width: '150px', height: '1px', top: '60%', left: '45%', transform: 'rotate(70deg)' }}></div>
          
          {/* Node 1: Project (Central) */}
          <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-transform duration-300 group-hover:scale-110">
              <Folder className="w-8 h-8 text-primary fill-current" />
            </div>
            <div className="mt-2 bg-card/80 backdrop-blur-md px-3 py-1 rounded border border-border shadow-lg">
              <span className="font-bold text-[10px] uppercase tracking-wider text-foreground">Nexus API Rewrite</span>
            </div>
          </div>

          {/* Node 2: Technology (Secondary) */}
          <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-card border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-transform duration-300 group-hover:scale-110">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="mt-2 bg-card/80 backdrop-blur-md px-2 py-1 rounded border border-border">
              <span className="font-mono text-xs text-cyan-400">GraphQL</span>
            </div>
          </div>

          {/* Node 3: Note (Neutral) */}
          <div className="absolute top-[60%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-card border border-muted-foreground flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:border-foreground">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="mt-2 bg-card/80 backdrop-blur-md px-2 py-1 rounded border border-border">
              <span className="font-mono text-xs text-muted-foreground">ADR-42: Routing</span>
            </div>
          </div>

          {/* Node 4: Bug (Warning/Destructive) */}
          <div className="absolute top-[45%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-card border-2 border-warning flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-transform duration-300 group-hover:scale-110">
              <Bug className="w-7 h-7 text-warning" />
            </div>
            <div className="mt-2 bg-card/80 backdrop-blur-md px-2 py-1 rounded border border-border flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
              <span className="font-mono text-xs text-warning">ISSUE-892</span>
            </div>
          </div>

          {/* Graph Controls Overlay (Bottom Left) */}
          <div className="absolute bottom-6 left-6 z-20 flex gap-2">
            <Button variant="outline" size="icon" className="w-10 h-10 bg-card/80 backdrop-blur-md shadow-lg" title="Zoom In">
              <ZoomIn className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 bg-card/80 backdrop-blur-md shadow-lg" title="Zoom Out">
              <ZoomOut className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 bg-card/80 backdrop-blur-md shadow-lg" title="Recenter">
              <Maximize className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Left Filter Panel (Glassmorphism overlay) */}
        <div className="absolute top-6 left-6 w-64 bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-20 flex flex-col overflow-hidden max-h-[calc(100%-3rem)]">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30">
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-foreground">Graph Filters</h3>
            <Filter className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="p-4 flex flex-col gap-4 overflow-y-auto">
            
            {/* Entity Types */}
            <div>
              <h4 className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Entity Types</h4>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-background" defaultChecked />
                  <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-primary transition-colors">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Projects
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border bg-background text-cyan-400 focus:ring-cyan-400 focus:ring-offset-background" defaultChecked />
                  <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-cyan-400 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Technologies
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border bg-background text-muted-foreground focus:ring-muted-foreground focus:ring-offset-background" defaultChecked />
                  <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-muted-foreground transition-colors">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                    Notes & Docs
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border bg-background text-warning focus:ring-warning focus:ring-offset-background" defaultChecked />
                  <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-warning transition-colors">
                    <span className="w-2 h-2 rounded-full bg-warning"></span>
                    Bugs / Issues
                  </span>
                </label>
              </div>
            </div>

            <div className="h-px bg-border w-full my-1"></div>

            {/* Depth */}
            <div>
              <h4 className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Traversal Depth</h4>
              <input type="range" min="1" max="5" defaultValue="3" className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-2">
                <span>1</span>
                <span>Max</span>
              </div>
            </div>

            <div className="h-px bg-border w-full my-1"></div>

            {/* Layout Mode */}
            <div>
              <h4 className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Layout Engine</h4>
              <div className="flex bg-muted rounded-lg p-1 border border-border">
                <button className="flex-1 py-1 px-2 rounded bg-background text-foreground font-mono text-[10px] shadow-sm transition-all text-center">Force</button>
                <button className="flex-1 py-1 px-2 rounded text-muted-foreground hover:text-foreground hover:bg-background/50 font-mono text-[10px] transition-all text-center">Hierarchy</button>
                <button className="flex-1 py-1 px-2 rounded text-muted-foreground hover:text-foreground hover:bg-background/50 font-mono text-[10px] transition-all text-center">Circular</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Detail Panel (Bento/Glass style) */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-card/95 backdrop-blur-2xl border-l border-border shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-30 flex flex-col transition-transform duration-300">
          
          {/* Panel Header */}
          <div className="p-6 border-b border-border flex items-start justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide font-bold">Project Node</span>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-success/10 text-success border border-success/20 flex items-center gap-1.5 font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Active
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Nexus API Rewrite</h2>
              <p className="font-mono text-xs text-muted-foreground mt-2">UUID: nx-api-v2-491a</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Panel Content (Scrollable Bento layout) */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            
            {/* Description Card */}
            <div className="bg-muted/30 border border-border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" /> Overview
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                Complete overhaul of the core routing and data fetching layer to support GraphQL Federation. This initiative aims to reduce latency by 40% across all client applications.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col justify-center shadow-sm">
                <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Connected Nodes</span>
                <span className="text-3xl text-primary font-bold">24</span>
              </div>
              <div className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col justify-center shadow-sm">
                <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Open Issues</span>
                <span className="text-3xl text-warning font-bold flex items-center gap-2">
                  3 <Bug className="w-6 h-6" />
                </span>
              </div>
            </div>

            {/* Relations Card */}
            <div className="bg-muted/30 border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
              <div className="p-3 border-b border-border bg-card/50">
                <h3 className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Network className="w-4 h-4" /> Direct Relations
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-sm text-foreground group-hover:text-cyan-400 transition-colors font-semibold">GraphQL Federation</div>
                      <div className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">DEPENDS_ON</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors font-semibold">ADR-42: Routing</div>
                      <div className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">DOCUMENTED_BY</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/10 border border-warning/30 flex items-center justify-center text-warning">
                      <Bug className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-sm text-foreground group-hover:text-warning transition-colors font-semibold">Memory Leak in Auth Flow</div>
                      <div className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">BLOCKED_BY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex gap-3">
              <Button variant="outline" className="flex-1 font-mono text-xs uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 mr-2" /> CLI
              </Button>
              <Button className="flex-1 font-mono text-xs uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 mr-2" /> Focus
              </Button>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
