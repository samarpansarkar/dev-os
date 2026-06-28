import { User, Layers, Palette, Link as LinkIcon, Key } from "lucide-react";

export function SettingsSidebar() {
  return (
    <aside className="w-48 shrink-0 flex flex-col gap-1 hidden md:flex">
      <div className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider mb-2 px-3">Configuration</div>
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors bg-card border-l-2 border-primary text-primary">
        <User className="w-5 h-5" />
        <span className="text-sm font-semibold">Profile</span>
      </button>
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent">
        <Layers className="w-5 h-5" />
        <span className="text-sm">Workspace</span>
      </button>
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent">
        <Palette className="w-5 h-5" />
        <span className="text-sm">Appearance</span>
      </button>
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent">
        <LinkIcon className="w-5 h-5" />
        <span className="text-sm">Integrations</span>
      </button>
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent">
        <Key className="w-5 h-5" />
        <span className="text-sm">API Keys</span>
      </button>
    </aside>
  );
}
