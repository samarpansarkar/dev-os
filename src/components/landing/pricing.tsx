import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingPricing() {
  return (
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
  );
}
