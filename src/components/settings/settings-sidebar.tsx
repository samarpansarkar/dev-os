import Link from "next/link";
import { User, Layers, Palette, Link as LinkIcon, Key } from "lucide-react";

export function SettingsSidebar({ activeTab = "profile" }: { activeTab?: string }) {
  return (
    <aside className="w-48 shrink-0 flex flex-col gap-1 hidden md:flex">
      <div className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider mb-2 px-3">Configuration</div>
      
      <Link 
        href="/settings?tab=profile" 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors border-l-2 ${activeTab === 'profile' ? 'bg-card border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
      >
        <User className="w-5 h-5" />
        <span className={`text-sm ${activeTab === 'profile' ? 'font-semibold' : ''}`}>Profile</span>
      </Link>
      
      <Link 
        href="/settings?tab=workspace" 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors border-l-2 ${activeTab === 'workspace' ? 'bg-card border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
      >
        <Layers className="w-5 h-5" />
        <span className={`text-sm ${activeTab === 'workspace' ? 'font-semibold' : ''}`}>Workspace</span>
      </Link>
      
      <Link 
        href="/settings?tab=appearance" 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors border-l-2 ${activeTab === 'appearance' ? 'bg-card border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
      >
        <Palette className="w-5 h-5" />
        <span className={`text-sm ${activeTab === 'appearance' ? 'font-semibold' : ''}`}>Appearance</span>
      </Link>
      
      <Link 
        href="/settings?tab=integrations" 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors border-l-2 ${activeTab === 'integrations' ? 'bg-card border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
      >
        <LinkIcon className="w-5 h-5" />
        <span className={`text-sm ${activeTab === 'integrations' ? 'font-semibold' : ''}`}>Integrations</span>
      </Link>
      
      <Link 
        href="/settings?tab=apikeys" 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors border-l-2 ${activeTab === 'apikeys' ? 'bg-card border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
      >
        <Key className="w-5 h-5" />
        <span className={`text-sm ${activeTab === 'apikeys' ? 'font-semibold' : ''}`}>API Keys</span>
      </Link>
    </aside>
  );
}
