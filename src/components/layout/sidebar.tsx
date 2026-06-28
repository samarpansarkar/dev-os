import * as React from "react";
import Link from "next/link";
import { 
  Home, Folder, FileText, Code, Database, Bug, Book, Settings, User
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Folder, label: "Projects", href: "/projects" },
  { icon: FileText, label: "Notes", href: "/notes" },
  { icon: Code, label: "Snippets", href: "/snippets" },
  { icon: Database, label: "Environments", href: "/environments" },
  { icon: Bug, label: "Bugs", href: "/bugs" },
  { icon: Book, label: "Learning", href: "/learning" },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border text-sidebar-foreground transition-all duration-300", className)}>
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
        <h1 className="text-lg font-bold tracking-tight text-sidebar-primary">DevOS</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <item.icon className="w-5 h-5 opacity-70" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings className="w-5 h-5 opacity-70" />
          Settings
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2 mt-1 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <User className="w-5 h-5 opacity-70" />
          Profile
        </Link>
      </div>
    </aside>
  );
}
