import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Plus, Search, Folder, Terminal, Eye, Share, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SnippetsPage() {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-background border border-border rounded-xl">
        
        {/* Filter Sidebar */}
        <aside className="w-56 border-r border-border bg-card/50 hidden lg:flex flex-col h-full overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider uppercase">Languages</h2>
            <ul className="space-y-1">
              {[
                { name: "TypeScript", count: 124, color: "bg-[#3178C6]", active: true },
                { name: "Python", count: 86, color: "bg-[#3572A5]" },
                { name: "Rust", count: 42, color: "bg-[#DEA584]" },
                { name: "Go", count: 38, color: "bg-[#00ADD8]" },
                { name: "SQL", count: 65, color: "bg-[#e38c00]" }
              ].map((lang) => (
                <li key={lang.name}>
                  <button className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors ${lang.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${lang.color}`}></span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </div>
                    <span className="font-mono text-xs opacity-70">{lang.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-border mt-auto">
            <h2 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider uppercase">Collections</h2>
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left text-sm">
                  <Folder className="w-4 h-4" />
                  <span>Favorites</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left text-sm">
                  <Folder className="w-4 h-4" />
                  <span>Team Shared</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Snippet List */}
        <div className="w-full md:w-[320px] lg:w-[380px] border-r border-border bg-background flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
            <h2 className="text-lg font-semibold">TypeScript</h2>
            <Button size="icon" variant="default" className="w-8 h-8 rounded-lg shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { title: "useAuth hook", time: "2d ago", desc: "Custom React hook for handling JWT authentication, token refresh, and session state context.", tags: ["react", "jwt", "auth"], active: true },
              { title: "Axios Interceptor", time: "5d ago", desc: "Global axios interceptor for appending auth tokens and handling 401 response retries.", tags: ["api", "axios"] },
              { title: "Debounce Utility", time: "1w ago", desc: "Type-safe debounce function implementation with generic arguments and return types.", tags: ["utils"] },
              { title: "Zod Schema - User", time: "2w ago", desc: "Comprehensive Zod validation schema for user registration and profile updates.", tags: ["validation", "zod"] },
            ].map((snippet, i) => (
              <div key={i} className={`p-4 border-b border-border cursor-pointer transition-colors ${snippet.active ? 'bg-muted/50 border-l-2 border-l-primary' : 'bg-background hover:bg-muted/30 border-l-2 border-l-transparent'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold text-sm truncate pr-4 ${snippet.active ? 'text-primary' : ''}`}>{snippet.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">{snippet.time}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {snippet.desc}
                </p>
                <div className="flex items-center gap-2">
                  {snippet.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px] border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 bg-background relative overflow-hidden flex flex-col p-4 lg:p-6">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex-1 bg-card/80 backdrop-blur-md border border-border rounded-xl flex flex-col overflow-hidden shadow-2xl relative z-10">
            {/* Toolbar */}
            <div className="h-14 border-b border-border bg-muted/30 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">useAuth.ts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md border border-border text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span className="font-mono text-xs">24 uses</span>
                </div>
                <Button variant="outline" size="sm" className="h-8 hidden md:flex">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" className="h-8 shadow-primary/20">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
            
            {/* Layout: Code + Meta Sidebar */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-1 bg-[#09090B] overflow-auto relative group p-4 font-mono text-sm leading-[1.6]">
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#09090B] border-r border-border/30 text-right pr-2 pt-4 select-none text-muted-foreground/50 flex flex-col text-xs">
                  {Array.from({length: 22}).map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <pre className="pl-10 m-0 text-gray-300"><code>
<span className="text-[#c678dd]">import</span> {"{ useState, useEffect, createContext, useContext }"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span>;
<span className="text-[#c678dd]">import</span> axios <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'axios'</span>;

<span className="text-[#5c6370] italic">// Define the shape of our auth context</span>
<span className="text-[#c678dd]">interface</span> <span className="text-[#e5c07b]">AuthContextType</span> {"{"}
  user: User | <span className="text-[#c678dd]">null</span>;
  loading: <span className="text-[#c678dd]">boolean</span>;
  login: (token: <span className="text-[#c678dd]">string</span>) {"=>"} <span className="text-[#c678dd]">void</span>;
  logout: () {"=>"} <span className="text-[#c678dd]">void</span>;
{"}"}

<span className="text-[#c678dd]">const</span> AuthContext = <span className="text-[#61afef]">createContext</span>{"<"}AuthContextType | <span className="text-[#c678dd]">null</span>{">"}(<span className="text-[#c678dd]">null</span>);

<span className="text-[#c678dd]">export function</span> <span className="text-[#61afef]">useAuth</span>() {"{"}
  <span className="text-[#c678dd]">const</span> context = <span className="text-[#61afef]">useContext</span>(AuthContext);
  <span className="text-[#c678dd]">if</span> (!context) {"{"}
    <span className="text-[#c678dd]">throw new</span> <span className="text-[#e5c07b]">Error</span>(<span className="text-[#98c379]">'useAuth must be used within an AuthProvider'</span>);
  {"}"}
  <span className="text-[#c678dd]">return</span> context;
{"}"}
                </code></pre>
              </div>

              {/* Meta Sidebar */}
              <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-muted/10 p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="bg-card border border-primary/30 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 blur-xl rounded-full"></div>
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">AI Explained</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This hook establishes a React Context for authentication. It throws a descriptive error if used outside its Provider, ensuring safe state access across your application components.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-muted-foreground mb-3 tracking-wider uppercase">Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author</span>
                      <span className="text-foreground flex items-center gap-2">SysAdmin</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span className="text-foreground">Oct 24, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated</span>
                      <span className="text-foreground">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dependencies</span>
                      <span className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">axios, react</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
