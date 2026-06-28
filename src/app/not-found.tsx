import Link from "next/link";
import { Search, Activity, Headset, ArrowRight, LayoutDashboard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 h-screen w-full bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-error/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full flex flex-col gap-10 z-10">
        <div className="text-center space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">404: Resource Not Found</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The endpoint you are looking for has been moved or does not exist.
          </p>
        </div>

        {/* Terminal Block */}
        <div className="bg-card/40 backdrop-blur-md rounded-xl overflow-hidden w-full border border-border shadow-2xl">
          <div className="bg-secondary/10 px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
              <div className="w-3 h-3 rounded-full bg-warning/80"></div>
              <div className="w-3 h-3 rounded-full bg-success/80"></div>
            </div>
            <span className="font-mono text-sm text-muted-foreground ml-2">error_log.sh</span>
          </div>
          <div className="p-6 font-mono text-sm md:text-base text-foreground space-y-2">
            <div><span className="text-secondary">$</span> curl -X GET /v1/missing-resource</div>
            <div className="text-destructive font-medium">HTTP/1.1 404 Not Found</div>
            <div>{"{"}&quot;error&quot;: &quot;ResourceMapper Exception&quot;, &quot;code&quot;: 404{"}"}</div>
            <div className="text-muted-foreground mt-4">Traceback (most recent call last):</div>
            <div className="text-muted-foreground pl-4">File &quot;ResourceMapper.tsx&quot;, line 42, in route_request</div>
            <div className="text-muted-foreground pl-4">raise NotFoundError(f&quot;Endpoint {'{'}path{'}'} unavailable&quot;)</div>
            <div className="text-destructive font-bold mt-4">NotFoundError: Endpoint /v1/missing-resource unavailable</div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1 */}
          <div className="bg-card/40 backdrop-blur-sm rounded-lg border border-border p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 text-foreground">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Search Documentation</h3>
            </div>
            <div className="relative w-full mt-auto">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                className="w-full bg-background/50 pl-9" 
                placeholder="Search docs..." 
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-card/40 backdrop-blur-sm rounded-lg border border-border p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 text-foreground">
              <Activity className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">Check API Status</h3>
            </div>
            <div className="mt-auto flex items-center justify-between bg-background/50 p-2.5 rounded border border-border">
              <span className="font-mono text-xs text-muted-foreground">status.devos.io</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-success bg-success/10 px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-card/40 backdrop-blur-sm rounded-lg border border-border p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 text-foreground">
              <Headset className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold">Contact Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-auto">Open a ticket with our engineering team.</p>
            <div className="flex items-center gap-2 text-primary font-medium mt-2">
              <span className="text-sm">Open Ticket</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Button asChild size="lg" className="w-full sm:w-auto px-8 gap-2">
            <Link href="/">
              <LayoutDashboard className="w-5 h-5" />
              Return to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 gap-2 bg-transparent">
            <Link href="/learning">
              <FileText className="w-5 h-5" />
              Go to Documentation
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
