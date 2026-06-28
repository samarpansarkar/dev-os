import { DashboardLayout } from "@/layouts/dashboard-layout";
import { FolderOpen, Plus, Send, X, Copy, AlignLeft, Timer, HardDrive, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ApiManagerPage() {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-background border border-border rounded-xl">
        
        {/* API Collection Sidebar (Inner Left) */}
        <div className="w-64 border-r border-border bg-card/30 flex flex-col h-full shrink-0">
          <div className="p-3 border-b border-border flex justify-between items-center bg-muted/30 shrink-0">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Collections</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs">
            {/* Folder: Auth */}
            <div>
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted/50 rounded cursor-pointer text-muted-foreground group">
                <FolderOpen className="w-4 h-4 group-hover:text-foreground" />
                <span>Authentication</span>
              </div>
              <div className="ml-6 space-y-1 mt-1 border-l border-border pl-2">
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded cursor-pointer group">
                  <span className="text-[10px] font-bold text-success">POST</span>
                  <span className="text-muted-foreground group-hover:text-foreground truncate">/v1/auth/login</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded cursor-pointer group">
                  <span className="text-[10px] font-bold text-success">POST</span>
                  <span className="text-muted-foreground group-hover:text-foreground truncate">/v1/auth/refresh</span>
                </div>
              </div>
            </div>
            
            {/* Folder: Users */}
            <div className="mt-2">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-muted/50 rounded cursor-pointer text-foreground group">
                <FolderOpen className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">Users API</span>
              </div>
              <div className="ml-6 space-y-1 mt-1 border-l border-primary/30 pl-2">
                <div className="flex items-center gap-2 px-2 py-1 bg-card rounded cursor-pointer border border-border shadow-sm">
                  <span className="text-[10px] font-bold text-cyan-400">GET</span>
                  <span className="text-foreground truncate font-semibold">/v1/users/{"{id}"}</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded cursor-pointer group">
                  <span className="text-[10px] font-bold text-cyan-400">GET</span>
                  <span className="text-muted-foreground group-hover:text-foreground truncate">/v1/users</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded cursor-pointer group">
                  <span className="text-[10px] font-bold text-success">POST</span>
                  <span className="text-muted-foreground group-hover:text-foreground truncate">/v1/users</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded cursor-pointer group">
                  <span className="text-[10px] font-bold text-warning">PUT</span>
                  <span className="text-muted-foreground group-hover:text-foreground truncate">/v1/users/{"{id}"}</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded cursor-pointer group">
                  <span className="text-[10px] font-bold text-destructive">DEL</span>
                  <span className="text-muted-foreground group-hover:text-foreground truncate">/v1/users/{"{id}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request / Response Pane (Right Split) */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          
          {/* URL Bar */}
          <div className="p-4 border-b border-border bg-card/30 shrink-0">
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1 pr-2 shadow-sm focus-within:border-primary transition-colors">
              <select className="bg-transparent border-r border-border py-1.5 pl-3 pr-8 font-mono font-bold text-cyan-400 focus:ring-0 focus:outline-none cursor-pointer text-sm">
                <option className="text-foreground bg-card">GET</option>
                <option className="text-foreground bg-card">POST</option>
                <option className="text-foreground bg-card">PUT</option>
                <option className="text-foreground bg-card">PATCH</option>
                <option className="text-foreground bg-card">DELETE</option>
              </select>
              <input 
                className="flex-1 bg-transparent border-none py-1.5 px-3 font-mono text-foreground focus:ring-0 focus:outline-none w-full text-sm" 
                type="text" 
                defaultValue="{{base_url}}/v1/users/usr_98a7f6x" 
              />
              <Button size="sm" className="h-8 font-mono font-bold uppercase tracking-wider text-xs">
                <Send className="w-3.5 h-3.5 mr-2" />
                Send
              </Button>
            </div>
          </div>

          {/* Content Splitter */}
          <div className="flex-1 flex flex-col xl:flex-row min-h-0">
            
            {/* Request Builder (Top/Left) */}
            <div className="flex-1 border-r border-border flex flex-col min-h-0 bg-card/10">
              {/* Tabs */}
              <div className="flex border-b border-border px-4 pt-2 gap-2 shrink-0">
                <button className="px-4 py-2 border-b-2 border-primary text-primary text-[10px] font-bold tracking-wider uppercase">Headers (2)</button>
                <button className="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-[10px] font-bold tracking-wider uppercase transition-colors">Params (0)</button>
                <button className="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5">
                  Body <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
                </button>
                <button className="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-[10px] font-bold tracking-wider uppercase transition-colors">Auth</button>
              </div>
              
              {/* Request Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                  {/* Headers Table */}
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-1/3">
                      <input className="w-full bg-background border border-border rounded px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-none" type="text" defaultValue="Authorization" />
                    </div>
                    <div className="flex-1 relative">
                      <input className="w-full bg-background border border-border rounded px-3 py-1.5 font-mono text-xs text-orange-300 focus:border-primary focus:outline-none" type="text" defaultValue="Bearer {{vault.api_key}}" />
                      <Key className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></Button>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-1/3">
                      <input className="w-full bg-background border border-border rounded px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-none" type="text" defaultValue="Content-Type" />
                    </div>
                    <div className="flex-1">
                      <input className="w-full bg-background border border-border rounded px-3 py-1.5 font-mono text-xs text-cyan-400 focus:border-primary focus:outline-none" type="text" defaultValue="application/json" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></Button>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full opacity-50 mt-4 border-t border-border pt-4">
                    <div className="w-1/3">
                      <input className="w-full bg-background border border-dashed border-muted-foreground/50 rounded px-3 py-1.5 font-mono text-xs text-muted-foreground focus:border-primary focus:outline-none focus:border-solid" placeholder="Key" type="text" />
                    </div>
                    <div className="flex-1">
                      <input className="w-full bg-background border border-dashed border-muted-foreground/50 rounded px-3 py-1.5 font-mono text-xs text-muted-foreground focus:border-primary focus:outline-none focus:border-solid" placeholder="Value" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Viewer (Bottom/Right) */}
            <div className="flex-1 flex flex-col min-h-0 bg-background">
              {/* Response Status Bar */}
              <div className="flex justify-between items-center border-b border-border px-4 py-1.5 bg-muted/30 shrink-0">
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 border-b-2 border-primary text-primary text-[10px] font-bold tracking-wider uppercase">Body</button>
                  <button className="px-4 py-1.5 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-[10px] font-bold tracking-wider uppercase transition-colors">Headers (8)</button>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    <span className="text-success font-bold">200 OK</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground border-l border-border pl-4">
                    <Timer className="w-3.5 h-3.5" />
                    <span>124 ms</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground border-l border-border pl-4">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>2.4 KB</span>
                  </div>
                </div>
              </div>
              
              {/* Response Body */}
              <div className="flex-1 p-0 overflow-y-auto relative bg-[#09090B]">
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-card border-r border-border text-right pr-2 pt-4 text-muted-foreground/50 text-[10px] select-none pointer-events-none font-mono">
                  {Array.from({length: 12}).map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <pre className="pl-14 pt-4 pb-4 pr-4 text-foreground overflow-x-auto m-0 font-mono text-sm leading-[1.6]"><code>
<span className="text-muted-foreground">{"{"}</span>
  <span className="text-cyan-400">"id"</span><span className="text-muted-foreground">:</span> <span className="text-success">"usr_98a7f6x"</span><span className="text-muted-foreground">,</span>
  <span className="text-cyan-400">"object"</span><span className="text-muted-foreground">:</span> <span className="text-success">"user"</span><span className="text-muted-foreground">,</span>
  <span className="text-cyan-400">"created_at"</span><span className="text-muted-foreground">:</span> <span className="text-warning">1679435821</span><span className="text-muted-foreground">,</span>
  <span className="text-cyan-400">"email"</span><span className="text-muted-foreground">:</span> <span className="text-success">"developer@devos.io"</span><span className="text-muted-foreground">,</span>
  <span className="text-cyan-400">"status"</span><span className="text-muted-foreground">:</span> <span className="text-success">"active"</span><span className="text-muted-foreground">,</span>
  <span className="text-cyan-400">"metadata"</span><span className="text-muted-foreground">:</span> <span className="text-muted-foreground">{"{"}</span>
    <span className="text-cyan-400">"plan"</span><span className="text-muted-foreground">:</span> <span className="text-success">"pro_tier"</span><span className="text-muted-foreground">,</span>
    <span className="text-cyan-400">"api_calls_limit"</span><span className="text-muted-foreground">:</span> <span className="text-warning">50000</span><span className="text-muted-foreground">,</span>
    <span className="text-cyan-400">"features"</span><span className="text-muted-foreground">:</span> <span className="text-muted-foreground">[</span><span className="text-success">"vault"</span><span className="text-muted-foreground">,</span> <span className="text-success">"graph"</span><span className="text-muted-foreground">,</span> <span className="text-success">"copilot"</span><span className="text-muted-foreground">]</span>
  <span className="text-muted-foreground">{"}"}</span>
<span className="text-muted-foreground">{"}"}</span>
                </code></pre>
                
                {/* Floating Actions for JSON */}
                <div className="absolute top-4 right-4 flex gap-1 bg-card border border-border rounded-md shadow-sm opacity-50 hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground rounded-r-none"><Copy className="w-3.5 h-3.5" /></Button>
                  <div className="w-px bg-border"></div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground rounded-l-none"><AlignLeft className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
