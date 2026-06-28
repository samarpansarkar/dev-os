import { 
  Blocks, Brain, Network, GitMerge, Shield, ShieldCheck, Cloud, PlaneTakeoff, Activity 
} from "lucide-react";

export function LandingFeatures() {
  return (
    <section className="py-24 relative" id="features">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Architecture</h2>
        <p className="text-lg text-muted-foreground max-w-xl">
          Everything you need to ship faster, built fundamentally on an intelligent foundation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
        {/* Feature 1 */}
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-8 flex flex-col relative overflow-hidden group md:col-span-2 transition-all duration-300 hover:border-primary/50 hover:bg-card/80">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
            <Blocks className="w-32 h-32 text-primary" />
          </div>
          <div className="relative z-10 flex-grow">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-border mb-6 group-hover:border-primary/50 transition-colors">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Code Intelligence</h3>
            <p className="text-muted-foreground max-w-md">
              Context-aware autocomplete, semantic refactoring, and real-time vulnerability scanning powered by a localized LLM trained on your specific architectural patterns.
            </p>
          </div>
          <div className="mt-auto relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              <Activity className="w-4 h-4" />
              <span>Latency: &lt;10ms</span>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:border-secondary/50 hover:bg-card/80">
          <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
            <Network className="w-24 h-24 text-secondary" />
          </div>
          <div className="relative z-10 flex-grow">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-border mb-6 group-hover:border-secondary/50 transition-colors">
              <GitMerge className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Knowledge Graph</h3>
            <p className="text-muted-foreground">
              Automatic documentation generation and dependency mapping. Instantly visualize how microservices interact.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:border-success/50 hover:bg-card/80">
          <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
            <Shield className="w-24 h-24 text-success" />
          </div>
          <div className="relative z-10 flex-grow">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-border mb-6 group-hover:border-success/50 transition-colors">
              <ShieldCheck className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Environment Vault</h3>
            <p className="text-muted-foreground">
              Zero-trust secret management injected directly into your runtime. No more scattered .env files.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-8 flex flex-col relative overflow-hidden group md:col-span-2 transition-all duration-300 hover:border-orange-500/50 hover:bg-card/80">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
            <div className="h-1 w-16 bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-full bg-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            </div>
            <Cloud className="w-8 h-8 text-orange-500" />
          </div>
          <div className="relative z-10 flex-grow">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-border mb-6 group-hover:border-orange-500/50 transition-colors">
              <PlaneTakeoff className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">One-Click Deploy</h3>
            <p className="text-muted-foreground max-w-md">
              From local branch to global edge network in seconds. Seamlessly integrated with major cloud providers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
