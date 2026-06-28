"use client";

import { Copy, Edit2, GitBranch, ExternalLink, Terminal, Link2, Key, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface ProjectViewModalProps {
  project: any;
  commitsData: any[] | undefined;
  commitsLoading: boolean;
  onClose: () => void;
  onEdit: (project: any, e: React.MouseEvent) => void;
  onCopy: (text: string, e?: React.MouseEvent) => void;
}

export function ProjectViewModal({
  project,
  commitsData,
  commitsLoading,
  onClose,
  onEdit,
  onCopy,
}: ProjectViewModalProps) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      title={project.name}
      subtitle={`${project.status} · ${project.visibility} Project`}
      icon={project.icon || "🚀"}
      footer={
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <GitBranch className="w-4 h-4" /> Repository
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
                <ExternalLink className="w-4 h-4" /> Production
              </a>
            )}
            {project.localPath && (
              <button onClick={() => onCopy(project.localPath)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <Terminal className="w-4 h-4" /> Copy Local Path
              </button>
            )}
          </div>
          <Button onClick={(e) => { onClose(); onEdit(project, e); }} variant="outline">
            <Edit2 className="w-4 h-4 mr-2" /> Edit Project
          </Button>
        </div>
      }
    >
      <div className="p-6 space-y-8">
        {/* Description */}
        {project.description && (
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
            <p className="text-foreground">{project.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Links */}
          {(project.links || []).length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Links</h3>
              <div className="space-y-2">
                {project.links.map((link: any, i: number) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-muted/20 border border-border rounded-lg hover:bg-muted/40 transition-colors group">
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{link.title}</span>
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-background border border-border">{link.type}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="space-y-6">
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-muted rounded text-xs font-mono">{t}</span>
                  ))}
                </div>
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-background border border-border rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Credentials */}
        {(project.credentials || []).length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.credentials.map((cred: any, i: number) => (
                <div key={i} className="p-4 bg-muted/20 border border-border rounded-lg relative group">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><Key className="w-4 h-4 text-amber-500" /> {cred.title}</h4>
                  <div className="space-y-1 text-sm font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">User:</span>
                      <span className="bg-background px-2 py-0.5 rounded border border-border select-all">{cred.username}</span>
                    </div>
                    {cred.password && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Pass:</span>
                        <div className="flex items-center gap-1">
                          <span className="bg-background px-2 py-0.5 rounded border border-border blur-sm hover:blur-none transition-all select-all">{cred.password}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => onCopy(cred.password)}><Copy className="w-3 h-3" /></Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {cred.note && <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/50">{cred.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Env Files */}
        {(project.environmentFiles || []).length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Environment Files</h3>
            <div className="space-y-4">
              {project.environmentFiles.map((env: any, i: number) => (
                <div key={i} className="p-4 bg-muted/10 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <h4 className="font-bold font-mono">{env.name}</h4>
                    <span className="text-[10px] uppercase border border-border px-1.5 rounded text-muted-foreground bg-background">{env.environment}</span>
                  </div>
                  <div className="space-y-1">
                    {(env.variables || []).map((v: any, vi: number) => (
                      <div key={vi} className="flex gap-2 items-center text-xs font-mono group/var">
                        <span className="text-muted-foreground w-1/3 truncate" title={v.key}>{v.key}</span>
                        <span className="text-muted-foreground">=</span>
                        {v.isSecret ? (
                          <span className="flex-1 bg-background px-1.5 py-0.5 rounded border border-border blur-sm hover:blur-none transition-all truncate select-all">{v.value}</span>
                        ) : (
                          <span className="flex-1 bg-background px-1.5 py-0.5 rounded border border-border truncate select-all">{v.value}</span>
                        )}
                        <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover/var:opacity-100" onClick={() => onCopy(v.value)}><Copy className="w-3 h-3" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Git Commits */}
        {(project.localPath || project.githubUrl) && (
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              Recent Commits
              {commitsData && commitsData.length > 0 && commitsData[0].github && (
                <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded uppercase tracking-wider">GitHub</span>
              )}
              {commitsData && commitsData.length > 0 && commitsData[0].local && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Local</span>
              )}
            </h3>
            {commitsLoading ? (
              <div className="p-4 bg-muted/10 border border-border rounded-lg text-sm text-muted-foreground animate-pulse">Loading commit history...</div>
            ) : commitsData && commitsData.length > 0 ? (
              <div className="space-y-3">
                {commitsData.map((commit: any) => (
                  <div key={commit.hash} className="p-3 bg-muted/10 border border-border rounded-lg hover:bg-muted/20 transition-colors flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{commit.subject}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/80">{commit.authorName}</span>
                        <span>&bull;</span>
                        <span>{commit.date}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
                      {commit.hash.substring(0, 7)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-muted/10 border border-border rounded-lg text-sm text-muted-foreground">
                No commits found, or unable to fetch from configured sources.
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
