import * as React from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNavbar() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b border-border">
      <div className="flex items-center flex-1">
        {/* Placeholder for Breadcrumbs or title */}
        <h2 className="text-sm font-medium text-muted-foreground">Workspace / Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden md:flex w-64 justify-start text-muted-foreground">
          <Search className="w-4 h-4 mr-2" />
          <span>Search documentation...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
