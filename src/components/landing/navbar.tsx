import Link from "next/link";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
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
        <Button variant="outline" className="hidden md:flex h-8 bg-transparent" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button className="h-8" asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
