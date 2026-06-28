import { DashboardLayout } from "@/layouts/dashboard-layout";
import { User, Layers, Palette, Link as LinkIcon, Key, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex gap-8 relative bg-background">
        
        {/* Settings Vertical Nav */}
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

        {/* Settings Canvas */}
        <div className="flex-1 max-w-4xl space-y-8 pb-12">
          
          <div className="mb-8 border-b border-border pb-4">
            <h2 className="text-3xl font-bold text-foreground mb-1">Profile Settings</h2>
            <p className="text-muted-foreground text-sm">Manage your personal information and preferences.</p>
          </div>

          {/* Bento Grid for Profile Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Avatar Card */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 flex flex-col items-center justify-center col-span-1 min-h-[200px] shadow-sm">
              <div className="relative group cursor-pointer mb-4">
                <div className="w-24 h-24 rounded-full border-2 border-border overflow-hidden group-hover:border-primary transition-colors bg-muted flex items-center justify-center">
                  {/* Placeholder Avatar */}
                  <div className="text-muted-foreground group-hover:text-primary transition-colors font-bold text-3xl">A</div>
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="w-5 h-5 text-white" />
                </div>
              </div>
              <button className="text-primary text-sm hover:underline font-semibold">Change Avatar</button>
            </div>

            {/* Personal Info */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 col-span-1 md:col-span-2 space-y-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">First Name</label>
                  <input 
                    className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors" 
                    type="text" 
                    defaultValue="Alex" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">Last Name</label>
                  <input 
                    className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors" 
                    type="text" 
                    defaultValue="Mercer" 
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">Email Address</label>
                <input 
                  className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors" 
                  type="email" 
                  defaultValue="alex.mercer@devos.io" 
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">Bio</label>
                <textarea 
                  className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" 
                  rows={3}
                  defaultValue="Full-stack engineer focusing on AI tooling."
                />
              </div>
              
              <div className="flex justify-end pt-2">
                <Button className="font-bold text-xs uppercase tracking-wider">Save Changes</Button>
              </div>
            </div>
          </div>

          {/* Preferences / Toggles Section */}
          <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 mt-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">Preferences</h3>
            <div className="space-y-4">
              
              {/* Toggle Item */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold text-foreground">Keyboard Shortcuts</p>
                  <p className="text-sm text-muted-foreground">Enable global command palette shortcut (Cmd/Ctrl + K)</p>
                </div>
                {/* Custom Toggle UI */}
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                </div>
              </div>

              {/* Toggle Item */}
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <div>
                  <p className="font-semibold text-foreground">Developer Mode</p>
                  <p className="text-sm text-muted-foreground">Show advanced debugging info in console</p>
                </div>
                {/* Custom Toggle UI */}
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
