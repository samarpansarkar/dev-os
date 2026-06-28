import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Plus, Hourglass, CheckCircle2, Circle, Share, Edit, Terminal, Copy, BrainCircuit, Lock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BugsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
        
        {/* Left Column: Bug List */}
        <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col gap-4 h-full">
          <div className="flex justify-between items-center mb-2 shrink-0">
            <h2 className="text-2xl font-semibold text-foreground">Bug KB</h2>
            <Button size="sm" className="h-8">
              <Plus className="w-4 h-4 mr-1" /> New
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1 shrink-0 no-scrollbar">
            <button className="px-3 py-1 bg-primary/10 border border-primary text-primary rounded-full font-mono text-xs whitespace-nowrap">All Open</button>
            <button className="px-3 py-1 bg-card border border-border text-muted-foreground hover:bg-muted rounded-full font-mono text-xs whitespace-nowrap">Critical</button>
            <button className="px-3 py-1 bg-card border border-border text-muted-foreground hover:bg-muted rounded-full font-mono text-xs whitespace-nowrap">Project: Core</button>
          </div>
          
          {/* Bug List Cards */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {/* Active Item */}
            <div className="p-4 bg-card/50 border border-primary rounded-lg cursor-pointer transition-colors relative overflow-hidden shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-muted-foreground">BUG-4092</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20 uppercase tracking-wider font-bold">Critical</span>
              </div>
              <h3 className="text-base text-foreground mb-1 font-semibold">Memory Leak in Edge Functions</h3>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-xs flex items-center gap-1 text-warning">
                  <Hourglass className="w-3.5 h-3.5" /> Investigating
                </span>
                <span className="text-border">|</span>
                <span className="font-mono text-xs text-muted-foreground">Proj: Serverless</span>
              </div>
            </div>
            
            {/* Inactive Items */}
            <div className="p-4 bg-card border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-muted-foreground">BUG-4088</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-warning/10 text-warning border border-warning/20 uppercase tracking-wider font-bold">Major</span>
              </div>
              <h3 className="text-base text-muted-foreground group-hover:text-foreground mb-1 transition-colors">OAuth Token Refresh Race Condition</h3>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-xs flex items-center gap-1 text-success">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                </span>
                <span className="text-border">|</span>
                <span className="font-mono text-xs text-muted-foreground">Proj: Auth</span>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-muted-foreground">BUG-4071</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider font-bold">Minor</span>
              </div>
              <h3 className="text-base text-muted-foreground group-hover:text-foreground mb-1 transition-colors">Stale Cache on Dashboard Widgets</h3>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-xs flex items-center gap-1 text-muted-foreground">
                  <Circle className="w-3.5 h-3.5" /> Open
                </span>
                <span className="text-border">|</span>
                <span className="font-mono text-xs text-muted-foreground">Proj: UI Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detail View */}
        <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col gap-6 h-full overflow-y-auto pr-1">
          {/* Detail Header */}
          <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 flex flex-col gap-4 shadow-sm shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-primary font-bold">BUG-4092</span>
                  <span className="px-1.5 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20 font-mono text-[10px] uppercase font-bold tracking-wider">Critical</span>
                  <span className="px-1.5 py-0.5 rounded bg-warning/10 text-warning border border-warning/20 font-mono text-[10px] uppercase font-bold tracking-wider">Investigating</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Memory Leak in Edge Functions</h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                  V8 isolate teardown fails occasionally under high concurrent load, causing gradual memory bloat on worker nodes.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground"><Share className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground"><Edit className="w-4 h-4" /></Button>
              </div>
            </div>
            
            {/* Meta Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border mt-2">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1.5">Assigned To</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20"></div>
                  <span className="font-mono text-xs text-foreground">Sarah J.</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1.5">Reported</p>
                <span className="font-mono text-xs text-foreground">2 hours ago</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1.5">Environment</p>
                <span className="font-mono text-xs text-foreground">Production (US-East)</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1.5">Project</p>
                <span className="font-mono text-xs text-foreground underline decoration-border underline-offset-4">Serverless Runtime</span>
              </div>
            </div>
          </div>

          {/* Bento Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
            
            {/* Stack Trace Area */}
            <div className="lg:col-span-2 bg-card/40 backdrop-blur-md border border-border rounded-xl flex flex-col overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-border bg-muted/30 flex justify-between items-center shrink-0">
                <h3 className="text-xs font-bold text-foreground tracking-wider uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-muted-foreground" /> Stack Trace
                </h3>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><Copy className="w-3.5 h-3.5" /></Button>
              </div>
              <div className="p-4 bg-[#09090B] flex-1 overflow-auto font-mono text-xs text-muted-foreground leading-relaxed">
                <span className="text-destructive font-bold">FATAL ERROR:</span> Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory<br/>
                 1: 0x10d1880 node::Abort() [node]<br/>
                 2: 0x10d2bc4 node::OnFatalError(char const*, char const*) [node]<br/>
                 3: 0x12ed1ce v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]<br/>
                 4: 0x12ed547 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]<br/>
                 5: 0x14a2a65 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [node]<br/>
                 <span className="text-cyan-400">at EdgeRuntime.execute (/var/task/runtime/index.js:142:19)</span><br/>
                 <span className="text-cyan-400">at WorkerPool.dispatch (/var/task/pool/worker.js:88:12)</span>
              </div>
            </div>

            {/* Sidebar Modules */}
            <div className="flex flex-col gap-6">
              
              {/* Root Cause Draft */}
              <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-4 shadow-sm flex flex-col">
                <h3 className="text-xs font-bold text-foreground tracking-wider uppercase flex items-center gap-2 mb-3">
                  <BrainCircuit className="w-4 h-4 text-primary" /> Root Cause Draft
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Initial analysis indicates that the context object passed to <code>Isolate.create()</code> holds references to connection pools that aren't garbage collected when the request terminates abruptly.
                </p>
                <button className="mt-3 text-primary font-mono text-xs text-left hover:underline w-fit">Edit Analysis...</button>
              </div>
              
              {/* Related Secrets / Vault Link */}
              <div className="bg-orange-500/5 backdrop-blur-md border-2 border-dashed border-border rounded-xl p-4 shadow-sm flex flex-col relative overflow-hidden">
                <h3 className="text-xs font-bold text-foreground tracking-wider uppercase flex items-center gap-2 mb-3 relative z-10">
                  <Lock className="w-4 h-4 text-orange-400" /> Related Secrets
                </h3>
                <p className="font-mono text-xs text-muted-foreground mb-3 relative z-10">Variables accessed during failure:</p>
                <ul className="space-y-2 relative z-10">
                  <li className="font-mono text-xs text-foreground flex justify-between bg-card/80 px-2 py-1.5 rounded border border-border">
                    <span>REDIS_CACHE_URL</span>
                    <span className="text-muted-foreground">Prod</span>
                  </li>
                  <li className="font-mono text-xs text-foreground flex justify-between bg-card/80 px-2 py-1.5 rounded border border-border">
                    <span>AWS_EXECUTION_ROLE</span>
                    <span className="text-muted-foreground">Prod</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full bg-orange-500/10 text-orange-500 border border-orange-500/30 hover:bg-orange-500/20 font-mono text-xs h-8 relative z-10">
                  Open in Vault <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
