import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Folder, FileText, ChevronRight, ChevronDown, Plus, FilePlus, FolderPlus, Sparkles, Bold, Italic, Code, Calendar, Clock, User, Tag, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotesPage() {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-background border border-border rounded-xl">
        
        {/* File Explorer Pane */}
        <aside className="w-64 border-r border-border bg-card/30 flex flex-col h-full overflow-hidden shrink-0">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Explorer</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                <FilePlus className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                <FolderPlus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 font-mono text-sm text-muted-foreground">
            <div className="flex items-center p-1.5 cursor-pointer rounded hover:bg-muted/50 transition-colors">
              <ChevronDown className="w-4 h-4 mr-1" />
              <Folder className="w-4 h-4 mr-2 text-primary" />
              <span>Architecture</span>
            </div>
            <div className="pl-6">
              <div className="flex items-center p-1.5 cursor-pointer rounded bg-muted/80 text-foreground border-l-2 border-primary">
                <FileText className="w-4 h-4 mr-2 text-cyan-400" />
                <span>system-design-v2.md</span>
              </div>
              <div className="flex items-center p-1.5 cursor-pointer rounded hover:bg-muted/50 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                <span>db-schema.md</span>
              </div>
            </div>
            <div className="flex items-center p-1.5 cursor-pointer rounded hover:bg-muted/50 transition-colors mt-1">
              <ChevronRight className="w-4 h-4 mr-1" />
              <Folder className="w-4 h-4 mr-2 text-primary" />
              <span>Meeting Notes</span>
            </div>
            <div className="flex items-center p-1.5 cursor-pointer rounded hover:bg-muted/50 transition-colors mt-1">
              <ChevronRight className="w-4 h-4 mr-1" />
              <Folder className="w-4 h-4 mr-2 text-primary" />
              <span>Snippets</span>
            </div>
          </div>
        </aside>

        {/* Editor Pane */}
        <section className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-primary),_transparent_50%)]"></div>
          
          <div className="h-12 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
              <span>Architecture</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">system-design-v2.md</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-7 text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                AI Summary
              </Button>
              <div className="w-px h-4 bg-border"></div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Bold className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Italic className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Code className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 lg:p-12 xl:p-16 relative">
            <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-muted-foreground prose-headings:text-primary max-w-none">
              <h1 className="text-4xl font-bold mb-6 text-foreground outline-none" contentEditable>System Design V2: Migration to Microservices</h1>
              <p className="text-lg mb-6 outline-none" contentEditable>
                This document outlines the proposed architecture for transitioning our monolithic backend into a microservices-based ecosystem. The primary goal is to improve scalability, fault tolerance, and developer velocity.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Current State vs Future State</h2>
              <p className="mb-6">
                Currently, all modules (Auth, Billing, Processing) run in a single Node.js instance. We will split these into independent services communicating via an event bus (Kafka) or gRPC for synchronous calls.
              </p>
              
              <div className="relative group mt-6 mb-8 rounded-lg overflow-hidden border border-border">
                <div className="bg-[#09090B] p-4 font-mono text-sm">
                  <pre className="m-0 text-gray-300"><code>
<span className="text-[#5c6370] italic">// Example gRPC definition for Auth Service</span>
<span className="text-[#c678dd]">syntax</span> = <span className="text-[#98c379]">"proto3"</span>;

<span className="text-[#c678dd]">package</span> auth;

<span className="text-[#c678dd]">service</span> AuthService {"{"}
  <span className="text-[#c678dd]">rpc</span> ValidateToken (TokenRequest) <span className="text-[#c678dd]">returns</span> (TokenResponse) {"{}"}
{"}"}

<span className="text-[#c678dd]">message</span> TokenRequest {"{"}
  <span className="text-[#c678dd]">string</span> token = <span className="text-[#d19a66]">1</span>;
{"}"}

<span className="text-[#c678dd]">message</span> TokenResponse {"{"}
  <span className="text-[#c678dd]">bool</span> is_valid = <span className="text-[#d19a66]">1</span>;
  <span className="text-[#c678dd]">string</span> user_id = <span className="text-[#d19a66]">2</span>;
{"}"}
                  </code></pre>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Proposed Architecture Diagram</h2>
              <p className="mb-6">Below is a Mermaid visualization of the new service interactions.</p>
              
              <div className="border border-border rounded-lg bg-muted/30 p-6 flex flex-col items-center justify-center min-h-[200px] relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-background text-xs px-2 py-1 rounded font-mono border border-border">mermaid</span>
                </div>
                <div className="text-center text-muted-foreground">
                  <Folder className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <span className="text-sm font-mono">[ Diagram Preview Rendering ]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metadata Sidebar */}
        <aside className="w-72 border-l border-border bg-card/30 flex flex-col h-full overflow-y-auto shrink-0">
          <div className="p-4 border-b border-border">
            <h3 className="text-[10px] font-bold text-muted-foreground mb-4 tracking-wider uppercase">Page Properties</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <span className="w-24 text-muted-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Created</span>
                <span className="text-foreground">Oct 24, 2023</span>
              </div>
              <div className="flex items-start">
                <span className="w-24 text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> Modified</span>
                <span className="text-foreground">2 hours ago</span>
              </div>
              <div className="flex items-start">
                <span className="w-24 text-muted-foreground flex items-center gap-1.5"><User className="w-4 h-4" /> Author</span>
                <div className="flex items-center gap-1.5 bg-background border border-border px-2 py-0.5 rounded-full">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  <span className="text-xs">A. Turing</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-muted-foreground flex items-center gap-1.5"><Tag className="w-4 h-4" /> Tags</span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-mono text-[11px]">architecture</span>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md font-mono text-[11px]">backend</span>
                  <span className="bg-muted border border-border px-2 py-0.5 rounded-md font-mono text-[11px] hover:text-foreground cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> add tag</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-[10px] font-bold text-muted-foreground mb-4 flex items-center gap-2 tracking-wider uppercase">
              <LinkIcon className="w-3.5 h-3.5" /> Backlinks (2)
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors cursor-pointer group">
                <h4 className="text-sm font-semibold text-primary group-hover:underline">Q3 Planning Notes</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">...we need to finalize the <span className="text-foreground font-semibold bg-primary/20 px-1 rounded">System Design V2</span> before the end of the sprint...</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors cursor-pointer group">
                <h4 className="text-sm font-semibold text-primary group-hover:underline">DevOps Sync</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Discussed infrastructure requirements for the upcoming <span className="text-foreground font-semibold bg-primary/20 px-1 rounded">System Design V2</span> deployment...</p>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </DashboardLayout>
  );
}
