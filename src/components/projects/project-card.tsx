"use client";

import { Edit2, Trash2, GitBranch, ExternalLink, Terminal, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: any;
  onView: (project: any) => void;
  onEdit: (project: any, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onCopy: (text: string, e?: React.MouseEvent) => void;
}

export function ProjectCard({ project, onView, onEdit, onDelete, onCopy }: ProjectCardProps) {
  return (
    <div
      onClick={() => onView(project)}
      className="bg-card border border-border rounded-xl flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer"
      style={{ borderTopColor: project.color, borderTopWidth: '4px' }}
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3 items-center">
            <div className="text-3xl bg-muted/50 p-2 rounded-lg">{project.icon}</div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : project.status === 'Completed' ? 'bg-blue-500/10 text-blue-500' : 'bg-muted text-muted-foreground'}`}>
                  {project.status}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">{project.visibility}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={(e) => onEdit(project, e)}>
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => onDelete(project._id, e)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech: string) => (
              <span key={tech} className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono rounded">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-border/50 text-xs">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" onClick={e => e.stopPropagation()}>
              <GitBranch className="w-3.5 h-3.5" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors" onClick={e => e.stopPropagation()}>
              <ExternalLink className="w-3.5 h-3.5" /> Live App
            </a>
          )}
          {project.localPath && (
            <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground font-mono text-[10px] mt-1 bg-muted/50 p-1.5 rounded" title={project.localPath}>
              <Terminal className="w-3 h-3 shrink-0" />
              <span className="truncate">{project.localPath}</span>
              <button onClick={(e) => onCopy(project.localPath, e)} className="ml-auto hover:text-foreground shrink-0"><Copy className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
