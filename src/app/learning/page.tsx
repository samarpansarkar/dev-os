import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Plus, Play, GraduationCap, Building2, Cpu, Repeat, Circle, CheckCircle2, Bookmark, FileText, BookOpen, Video, Award, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function LearningPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-foreground tracking-tight">Learning Hub</h2>
              <p className="text-muted-foreground mt-2">Track technical growth, organize knowledge, and master new skills.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Resource
              </Button>
              <Button>
                <Play className="w-4 h-4 mr-2 fill-current" />
                Resume Learning
              </Button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Active Courses (Spans 8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="text-primary w-6 h-6" />
                Active Courses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Course Card 1 */}
                <div className="bg-card/40 backdrop-blur-md p-6 rounded-xl relative group overflow-hidden border border-border hover:border-primary/50 transition-colors shadow-sm">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 rounded font-bold">68%</span>
                  </div>
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center mb-6 border border-border">
                    <div className="text-cyan-400"> {/* Architecture icon placeholder if missing */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Advanced System Design</h4>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">Mastering distributed systems, scalability, and microservices architecture patterns.</p>
                  <Progress value={68} className="h-1.5 mb-2 bg-muted [&>div]:bg-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>Module 4/6</span>
                    <span>Next: Data Partitioning</span>
                  </div>
                </div>

                {/* Course Card 2 */}
                <div className="bg-card/40 backdrop-blur-md p-6 rounded-xl relative group overflow-hidden border border-border hover:border-primary/50 transition-colors shadow-sm">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 rounded font-bold">32%</span>
                  </div>
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center mb-6 border border-border">
                    <Cpu className="text-orange-400 w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Rust for Systems Programming</h4>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">Deep dive into ownership, borrowing, lifetimes, and unsafe Rust concepts.</p>
                  <Progress value={32} className="h-1.5 mb-2 bg-muted [&>div]:bg-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>Chapter 3/10</span>
                    <span>Next: Lifetimes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Revision (Spans 4 cols) */}
            <div className="lg:col-span-4 bg-card/40 backdrop-blur-md p-6 rounded-xl flex flex-col border border-border shadow-sm">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <Repeat className="text-warning w-5 h-5" />
                Daily Revision
              </h3>
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] pr-2">
                
                <div className="p-3 rounded-lg border border-border bg-background flex items-start gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                    <Circle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Review GraphQL Caching</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">Spaced Repetition • 15 mins</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border bg-background flex items-start gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                    <Circle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Practice LeetCode #146 (LRU Cache)</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">Algorithms • 30 mins</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border bg-background flex items-start gap-3 opacity-50">
                  <div className="mt-0.5 text-success">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground line-through">Read 'Designing Data-Intensive Applications' Ch 2</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">System Design • Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Read Later / Bookmarks (Spans 6 cols) */}
            <div className="lg:col-span-6 bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Bookmark className="text-cyan-400 w-5 h-5" />
                  Read Later
                </h3>
                <button className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">View All</button>
              </div>
              <ul className="space-y-1">
                <li className="group flex items-center gap-3 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <FileText className="text-muted-foreground w-5 h-5 group-hover:text-primary" />
                  <div className="flex-1 truncate">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">Understanding React Server Components</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">Next.js Docs • Added 2d ago</p>
                  </div>
                  <span className="font-mono text-[10px] bg-background px-2 py-0.5 rounded text-muted-foreground border border-border shrink-0">10 min</span>
                </li>

                <li className="group flex items-center gap-3 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <BookOpen className="text-muted-foreground w-5 h-5 group-hover:text-primary" />
                  <div className="flex-1 truncate">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">Go Concurrency Patterns</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">Go Blog • Added 5d ago</p>
                  </div>
                  <span className="font-mono text-[10px] bg-background px-2 py-0.5 rounded text-muted-foreground border border-border shrink-0">25 min</span>
                </li>

                <li className="group flex items-center gap-3 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <Video className="text-muted-foreground w-5 h-5 group-hover:text-primary" />
                  <div className="flex-1 truncate">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">Kubernetes Networking Explained</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">YouTube • Added 1w ago</p>
                  </div>
                  <span className="font-mono text-[10px] bg-background px-2 py-0.5 rounded text-muted-foreground border border-border shrink-0">45 min</span>
                </li>
              </ul>
            </div>

            {/* Milestones & Certificates (Spans 6 cols) */}
            <div className="lg:col-span-6 bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="text-orange-400 w-5 h-5" />
                  Achievements
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="border border-border rounded-xl p-4 bg-background relative overflow-hidden flex flex-col items-center text-center hover:border-primary/50 transition-colors justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Award className="text-primary w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold">AWS Solutions Architect</h4>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">Associate • Issued Oct 2023</p>
                </div>

                <div className="border border-border rounded-xl p-4 bg-background relative overflow-hidden flex flex-col items-center text-center hover:border-cyan-400/50 transition-colors justify-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-3">
                    <Flame className="text-cyan-400 w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold">30 Day Streak</h4>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">Consistent Learning</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
