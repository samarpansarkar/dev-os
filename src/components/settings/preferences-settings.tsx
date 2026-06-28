export function PreferencesSettings() {
  return (
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
  );
}
