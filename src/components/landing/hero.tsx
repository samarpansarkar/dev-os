import Link from "next/link";
import { Rocket, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="min-h-[819px] flex flex-col items-center justify-center text-center relative py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
        <span className="w-2 h-2 rounded-full bg-success"></span>
        <span className="font-mono text-xs text-muted-foreground">v1.0.4 is now live</span>
      </div>
      
      <h1 className="text-5xl md:text-6xl lg:text-[72px] lg:leading-[80px] font-bold text-foreground max-w-4xl mb-6 tracking-tight">
        The AI-Powered <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Operating System
        </span><br />
        for Developers.
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
        Unify your entire workflow. DevOS seamlessly integrates your codebase, knowledge base, and deployment pipelines into a single, intelligent environment designed for high-velocity teams.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button size="lg" className="px-8 h-12 text-base gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)]" asChild>
          <Link href="/dashboard">
            <Rocket className="w-5 h-5" />
            Start Building Free
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="px-8 h-12 text-base gap-2 bg-transparent">
          <PlayCircle className="w-5 h-5" />
          Watch Demo
        </Button>
      </div>

      {/* Dashboard Preview Abstract */}
      <div className="mt-24 w-full max-w-5xl bg-card/60 backdrop-blur-md rounded-xl border border-border p-2 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none"></div>
        <div className="h-8 border-b border-border flex items-center px-4 gap-2 opacity-50">
          <div className="w-3 h-3 rounded-full bg-border"></div>
          <div className="w-3 h-3 rounded-full bg-border"></div>
          <div className="w-3 h-3 rounded-full bg-border"></div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 opacity-70">
          <div className="hidden md:block col-span-3 space-y-4">
            <div className="h-4 bg-secondary/10 rounded w-3/4"></div>
            <div className="h-4 bg-secondary/10 rounded w-1/2"></div>
            <div className="h-4 bg-secondary/10 rounded w-2/3"></div>
          </div>
          <div className="col-span-1 md:col-span-9 border border-border rounded-lg p-4 bg-background/50">
            <div className="font-mono text-xs text-primary mb-2">~ /devos/core/engine.ts</div>
            <div className="space-y-2">
              <div className="h-3 bg-secondary/20 rounded w-full"></div>
              <div className="h-3 bg-secondary/20 rounded w-5/6"></div>
              <div className="h-3 bg-secondary/20 rounded w-4/6 ml-4"></div>
              <div className="h-3 bg-secondary/20 rounded w-3/6 ml-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
