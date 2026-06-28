import Link from "next/link";
import { 
  Terminal, Rocket, PlayCircle, Blocks, Brain, Network, 
  GitMerge, Shield, ShieldCheck, Cloud, PlaneTakeoff, Check, X, Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col relative bg-background text-foreground overflow-x-hidden font-sans">
      {/* Ambient Glow Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-primary/15 blur-[100px] rounded-full top-[10%] left-[20%]"></div>
        <div className="absolute w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full top-[60%] right-[10%]"></div>
      </div>
      
      {/* Background Grid */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, rgba(39, 39, 42, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(39, 39, 42, 0.5) 1px, transparent 1px)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border h-14 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-bold text-xl text-primary tracking-tight">DevOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex h-8 bg-transparent">
            Log In
          </Button>
          <Button className="h-8" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow z-10 flex flex-col pt-24 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
        {/* Hero Section */}
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

        {/* Features Section */}
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

        {/* Pricing Section */}
        <section className="py-24 border-t border-border mt-12 relative" id="pricing">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Scale your operations without scaling your costs unexpectedly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-card/40 backdrop-blur-md p-8 flex flex-col border border-border rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-2">Hobby</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8 h-10">Perfect for individual developers and side projects.</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Local Code Intelligence
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Up to 3 Projects
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Basic Environment Vault
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground opacity-50">
                  <X className="w-5 h-5" /> Team Collaboration
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">Start Free</Button>
            </div>

            {/* Pro Tier */}
            <div className="bg-card/40 backdrop-blur-md p-8 flex flex-col border-2 border-primary rounded-xl relative transform md:-translate-y-4 shadow-[0_10px_40px_rgba(173,198,255,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/user/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8 h-10">For professional developers and small teams.</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Advanced Cloud Intelligence
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Unlimited Projects
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Knowledge Graph Generation
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Team Collaboration
                </li>
              </ul>
              <Button className="w-full">Upgrade to Pro</Button>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-card/40 backdrop-blur-md p-8 flex flex-col border border-border rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground mt-1 block">Custom</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8 h-10">For large organizations requiring strict security and scale.</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Self-Hosted Model Deployment
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Custom LLM Fine-tuning
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> Dedicated Support SLA
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success" /> SSO & Audit Logging
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">Contact Sales</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
