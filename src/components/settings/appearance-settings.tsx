import { Moon, Sun, Monitor, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppearanceSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-8 border-b border-border pb-4">
        <h2 className="text-3xl font-bold text-foreground mb-1">Appearance</h2>
        <p className="text-muted-foreground text-sm">Customize how DevOS looks and feels on your device.</p>
      </div>

      {/* Theme Selection */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">Theme</h3>
        <p className="text-sm text-muted-foreground mb-6">Select or customize your UI theme.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Light Theme Option */}
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-transparent bg-muted/30 hover:bg-muted/50 transition-colors relative group">
            <div className="w-full aspect-video rounded-md bg-[#f8fafc] border border-border flex items-center justify-center shadow-sm overflow-hidden relative">
              {/* Mini mock UI */}
              <div className="absolute inset-x-0 top-0 h-3 bg-gray-200" />
              <div className="absolute inset-y-0 left-0 w-4 bg-gray-100" />
              <Sun className="w-8 h-8 text-amber-500 opacity-50" />
            </div>
            <span className="font-semibold text-sm">Light</span>
          </button>

          {/* Dark Theme Option (Active) */}
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5 transition-colors relative group">
            <div className="w-full aspect-video rounded-md bg-[#09090b] border border-border flex items-center justify-center shadow-sm overflow-hidden relative">
               {/* Mini mock UI */}
               <div className="absolute inset-x-0 top-0 h-3 bg-neutral-900" />
              <div className="absolute inset-y-0 left-0 w-4 bg-neutral-950" />
              <Moon className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
            <span className="font-semibold text-sm text-primary">Dark</span>
            <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4 text-black" />
            </div>
          </button>

          {/* System Theme Option */}
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-transparent bg-muted/30 hover:bg-muted/50 transition-colors relative group">
            <div className="w-full aspect-video rounded-md bg-gradient-to-br from-[#f8fafc] to-[#09090b] border border-border flex items-center justify-center shadow-sm overflow-hidden relative">
              {/* Mini mock UI */}
              <div className="absolute inset-x-0 top-0 h-3 bg-gray-500/30" />
              <div className="absolute inset-y-0 left-0 w-4 bg-gray-500/20" />
              <Monitor className="w-8 h-8 text-foreground/50 opacity-50" />
            </div>
            <span className="font-semibold text-sm">System</span>
          </button>

        </div>
      </div>

      {/* Accent Color Selection */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">Accent Color</h3>
        <p className="text-sm text-muted-foreground mb-6">Choose a primary color for buttons and active states.</p>
        
        <div className="flex flex-wrap gap-4">
          <button className="w-10 h-10 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-offset-background ring-blue-500 flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-purple-500 hover:scale-110 transition-transform shadow-sm"></button>
          <button className="w-10 h-10 rounded-full bg-rose-500 hover:scale-110 transition-transform shadow-sm"></button>
          <button className="w-10 h-10 rounded-full bg-emerald-500 hover:scale-110 transition-transform shadow-sm"></button>
          <button className="w-10 h-10 rounded-full bg-amber-500 hover:scale-110 transition-transform shadow-sm"></button>
          <button className="w-10 h-10 rounded-full bg-slate-500 hover:scale-110 transition-transform shadow-sm"></button>
        </div>
      </div>

      {/* Interface Density */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">Density</h3>
        <p className="text-sm text-muted-foreground mb-6">Adjust the spacing and size of interface elements.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <button className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 text-left">
            <div className="flex-1 space-y-2">
              <div className="h-2 w-3/4 bg-primary/20 rounded"></div>
              <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
              <div className="h-2 w-5/6 bg-primary/20 rounded"></div>
            </div>
            <div className="font-semibold text-sm w-24 text-right text-primary flex items-center gap-2 justify-end">
              Comfortable
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </button>

          <button className="flex items-center gap-4 p-4 rounded-xl border-2 border-transparent bg-muted/30 hover:bg-muted/50 text-left transition-colors">
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-1/2 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-5/6 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-2/3 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-4/5 bg-muted-foreground/30 rounded"></div>
            </div>
            <div className="font-semibold text-sm w-24 text-right text-muted-foreground">
              Compact
            </div>
          </button>
          
        </div>
      </div>

    </div>
  );
}
