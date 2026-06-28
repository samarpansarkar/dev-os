"use client";

import { Moon, Sun, Monitor, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAppearance } from "@/providers/appearance-provider";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const { accentColor, setAccentColor, density, setDensity } = useAppearance();
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
          <button 
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-colors relative group ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/30 hover:bg-muted/50'}`}
          >
            <div className="w-full aspect-video rounded-md bg-[#f8fafc] border border-border flex items-center justify-center shadow-sm overflow-hidden relative">
              {/* Mini mock UI */}
              <div className="absolute inset-x-0 top-0 h-3 bg-gray-200" />
              <div className="absolute inset-y-0 left-0 w-4 bg-gray-100" />
              <Sun className="w-8 h-8 text-amber-500 opacity-50" />
            </div>
            <span className={`font-semibold text-sm ${theme === 'light' ? 'text-primary' : ''}`}>Light</span>
            {theme === 'light' && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 text-black" />
              </div>
            )}
          </button>

          {/* Dark Theme Option */}
          <button 
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-colors relative group ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/30 hover:bg-muted/50'}`}
          >
            <div className="w-full aspect-video rounded-md bg-[#09090b] border border-border flex items-center justify-center shadow-sm overflow-hidden relative">
               {/* Mini mock UI */}
               <div className="absolute inset-x-0 top-0 h-3 bg-neutral-900" />
              <div className="absolute inset-y-0 left-0 w-4 bg-neutral-950" />
              <Moon className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
            <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-primary' : ''}`}>Dark</span>
            {theme === 'dark' && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 text-black" />
              </div>
            )}
          </button>

          {/* System Theme Option */}
          <button 
            onClick={() => setTheme("system")}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-colors relative group ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/30 hover:bg-muted/50'}`}
          >
            <div className="w-full aspect-video rounded-md bg-gradient-to-br from-[#f8fafc] to-[#09090b] border border-border flex items-center justify-center shadow-sm overflow-hidden relative">
              {/* Mini mock UI */}
              <div className="absolute inset-x-0 top-0 h-3 bg-gray-500/30" />
              <div className="absolute inset-y-0 left-0 w-4 bg-gray-500/20" />
              <Monitor className="w-8 h-8 text-foreground/50 opacity-50" />
            </div>
            <span className={`font-semibold text-sm ${theme === 'system' ? 'text-primary' : ''}`}>System</span>
            {theme === 'system' && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 text-black" />
              </div>
            )}
          </button>

        </div>
      </div>

      {/* Accent Color Selection */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">Accent Color</h3>
        <p className="text-sm text-muted-foreground mb-6">Choose a primary color for buttons and active states.</p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setAccentColor("default")} 
            className={`w-10 h-10 rounded-full bg-[#adc6ff] flex items-center justify-center shadow-sm transition-all ${accentColor === 'default' ? 'ring-2 ring-offset-2 ring-offset-background ring-[#adc6ff] scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'default' && <CheckCircle2 className="w-5 h-5 text-black" />}
          </button>
          <button 
            onClick={() => setAccentColor("blue")} 
            className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-sm transition-all ${accentColor === 'blue' ? 'ring-2 ring-offset-2 ring-offset-background ring-blue-500 scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'blue' && <CheckCircle2 className="w-5 h-5 text-white" />}
          </button>
          <button 
            onClick={() => setAccentColor("purple")} 
            className={`w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shadow-sm transition-all ${accentColor === 'purple' ? 'ring-2 ring-offset-2 ring-offset-background ring-purple-500 scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'purple' && <CheckCircle2 className="w-5 h-5 text-white" />}
          </button>
          <button 
            onClick={() => setAccentColor("rose")} 
            className={`w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-sm transition-all ${accentColor === 'rose' ? 'ring-2 ring-offset-2 ring-offset-background ring-rose-500 scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'rose' && <CheckCircle2 className="w-5 h-5 text-white" />}
          </button>
          <button 
            onClick={() => setAccentColor("emerald")} 
            className={`w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm transition-all ${accentColor === 'emerald' ? 'ring-2 ring-offset-2 ring-offset-background ring-emerald-500 scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'emerald' && <CheckCircle2 className="w-5 h-5 text-white" />}
          </button>
          <button 
            onClick={() => setAccentColor("amber")} 
            className={`w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-sm transition-all ${accentColor === 'amber' ? 'ring-2 ring-offset-2 ring-offset-background ring-amber-500 scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'amber' && <CheckCircle2 className="w-5 h-5 text-white" />}
          </button>
          <button 
            onClick={() => setAccentColor("slate")} 
            className={`w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center shadow-sm transition-all ${accentColor === 'slate' ? 'ring-2 ring-offset-2 ring-offset-background ring-slate-500 scale-110' : 'hover:scale-110'}`}
          >
            {accentColor === 'slate' && <CheckCircle2 className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Interface Density */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">Density</h3>
        <p className="text-sm text-muted-foreground mb-6">Adjust the spacing and size of interface elements.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <button 
            onClick={() => setDensity("comfortable")}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${density === 'comfortable' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/30 hover:bg-muted/50'}`}
          >
            <div className="flex-1 space-y-2">
              <div className="h-2 w-3/4 bg-primary/20 rounded"></div>
              <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
              <div className="h-2 w-5/6 bg-primary/20 rounded"></div>
            </div>
            <div className={`font-semibold text-sm w-24 text-right flex items-center gap-2 justify-end ${density === 'comfortable' ? 'text-primary' : 'text-muted-foreground'}`}>
              Comfortable
              {density === 'comfortable' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </button>

          <button 
            onClick={() => setDensity("compact")}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${density === 'compact' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/30 hover:bg-muted/50'}`}
          >
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-1/2 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-5/6 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-2/3 bg-muted-foreground/30 rounded"></div>
              <div className="h-1.5 w-4/5 bg-muted-foreground/30 rounded"></div>
            </div>
            <div className={`font-semibold text-sm w-24 text-right flex items-center gap-2 justify-end ${density === 'compact' ? 'text-primary' : 'text-muted-foreground'}`}>
              Compact
              {density === 'compact' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </button>
          
        </div>
      </div>

    </div>
  );
}
