"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Folder, Terminal, Eye, Share, Copy, Sparkles, X, Save, Edit2, Trash2, GitBranch, ExternalLink, Link2, Key, FileCode2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function ProjectsClient() {
  const queryClient = useQueryClient();

  // Fetch Projects using TanStack Query
  const { data: projectsData, isLoading: loading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const json = await res.json();
      return json.data || [];
    }
  });
  const projects = projectsData || [];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<any | null>(null);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  const { data: commitsData, isLoading: commitsLoading } = useQuery({
    queryKey: ['commits', activeProject?._id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${activeProject._id}/commits`);
      const json = await res.json();
      return json.data || [];
    },
    enabled: isViewing && (!!activeProject?.localPath || !!activeProject?.githubUrl),
    retry: false
  });
  
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    description: "",
    icon: "🚀",
    color: "#3b82f6",
    status: "Active",
    visibility: "Private",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    localPath: "",
    tags: "",
    isFavorite: false,
    environmentFiles: [],
    links: [],
    credentials: [],
  });

  const handleCopy = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  const saveProjectMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = isEditing ? `/api/projects/${isEditing}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.projectPayload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return { savedProject: data.data, formData: payload.formData };
    },
    onSuccess: async (data) => {
      const { savedProject, formData } = data;

      // Extract variables and sync them to Vault
      let allVariables: any[] = [];
      formData.environmentFiles.forEach((env: any, index: number) => {
        const savedEnvFile = savedProject.environmentFiles[index];
        if (savedEnvFile && env.variables) {
          env.variables.forEach((v: any) => {
            allVariables.push({
              envFileId: savedEnvFile._id,
              key: v.key,
              value: v.value,
              description: v.description,
              isSecret: v.isSecret
            });
          });
        }
      });

      // Sync to vault
      await fetch('/api/vault/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: savedProject._id,
          variables: allVariables
        })
      });

      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['vault', savedProject._id] });
      setIsModalOpen(false);
      setIsEditing(null);
    },
    onError: (err: any) => {
      alert(err.message);
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const projectPayload = {
      ...formData,
      techStack: formData.techStack ? (typeof formData.techStack === 'string' ? formData.techStack.split(',').map((t: string) => t.trim()).filter(Boolean) : formData.techStack) : [],
      tags: formData.tags ? (typeof formData.tags === 'string' ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : formData.tags) : [],
      environmentFiles: formData.environmentFiles.map((env: any) => ({
        _id: env._id,
        name: env.name,
        environment: env.environment
      }))
    };

    saveProjectMutation.mutate({ projectPayload, formData });
  };

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  const openEditModal = async (project: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // Fetch variables for this project from the vault
    let vaultVariables = [];
    try {
      const res = await fetch(`/api/vault?projectId=${project._id}`);
      const data = await res.json();
      if (data.success) {
        vaultVariables = data.data;
      }
    } catch (err) {
      console.error('Failed to fetch vault variables', err);
    }

    // Map variables back into their respective environmentFiles for the UI
    const envFilesWithVars = (project.environmentFiles || []).map((file: any) => {
      return {
        ...file,
        variables: vaultVariables.filter((v: any) => v.envFileId === file._id)
      };
    });

    setFormData({
      name: project.name,
      slug: project.slug,
      description: project.description || "",
      icon: project.icon || "🚀",
      color: project.color || "#3b82f6",
      status: project.status || "Active",
      visibility: project.visibility || "Private",
      techStack: project.techStack?.join(', ') || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      localPath: project.localPath || "",
      tags: project.tags?.join(', ') || "",
      isFavorite: project.isFavorite || false,
      environmentFiles: envFilesWithVars,
      links: project.links || [],
      credentials: project.credentials || [],
    });
    setIsEditing(project._id);
    setIsModalOpen(true);
  };

  const openViewModal = async (project: any) => {
    try {
      const vaultRes = await fetch(`/api/vault?projectId=${project._id}`);
      const vaultJson = await vaultRes.json();
      const vaultVariables = vaultJson.data || [];
      
      const envFilesWithVars = (project.environmentFiles || []).map((file: any) => {
        return {
          ...file,
          variables: vaultVariables.filter((v: any) => v.envFileId === file._id)
        };
      });

      setActiveProject({
        ...project,
        environmentFiles: envFilesWithVars
      });
      setIsViewing(true);
    } catch (err) {
      console.error('Failed to fetch vault variables', err);
      setActiveProject(project);
      setIsViewing(true);
    }
  };

  const openNewModal = () => {
    setIsEditing(null);
    setFormData({
      name: "", slug: "", description: "", icon: "🚀", color: "#3b82f6",
      status: "Active", visibility: "Private", techStack: "", githubUrl: "",
      liveUrl: "", localPath: "", tags: "", isFavorite: false,
      environmentFiles: [], links: [], credentials: []
    });
    setIsModalOpen(true);
  };

  // Dynamic Array Helpers
  const addLink = () => {
    setFormData({ ...formData, links: [...formData.links, { title: "", url: "", type: "Other" }] });
  };
  const updateLink = (index: number, field: string, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index][field] = value;
    setFormData({ ...formData, links: newLinks });
  };
  const removeLink = (index: number) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData({ ...formData, links: newLinks });
  };

  const addCredential = () => {
    setFormData({ ...formData, credentials: [...formData.credentials, { title: "", username: "", password: "", note: "" }] });
  };
  const updateCredential = (index: number, field: string, value: string) => {
    const newCreds = [...formData.credentials];
    newCreds[index][field] = value;
    setFormData({ ...formData, credentials: newCreds });
  };
  const removeCredential = (index: number) => {
    const newCreds = [...formData.credentials];
    newCreds.splice(index, 1);
    setFormData({ ...formData, credentials: newCreds });
  };

  const addEnvFile = () => {
    setFormData({ ...formData, environmentFiles: [...formData.environmentFiles, { name: ".env", environment: "Development", variables: [] }] });
  };
  const updateEnvFile = (index: number, field: string, value: string) => {
    const newEnvs = [...formData.environmentFiles];
    newEnvs[index][field] = value;
    setFormData({ ...formData, environmentFiles: newEnvs });
  };
  const removeEnvFile = (index: number) => {
    const newEnvs = [...formData.environmentFiles];
    newEnvs.splice(index, 1);
    setFormData({ ...formData, environmentFiles: newEnvs });
  };
  
  const addEnvVar = (fileIndex: number) => {
    const newEnvs = [...formData.environmentFiles];
    newEnvs[fileIndex].variables.push({ key: "", value: "", description: "", isSecret: false });
    setFormData({ ...formData, environmentFiles: newEnvs });
  };
  const updateEnvVar = (fileIndex: number, varIndex: number, field: string, value: any) => {
    const newEnvs = [...formData.environmentFiles];
    newEnvs[fileIndex].variables[varIndex][field] = value;
    setFormData({ ...formData, environmentFiles: newEnvs });
  };
  const removeEnvVar = (fileIndex: number, varIndex: number) => {
    const newEnvs = [...formData.environmentFiles];
    newEnvs[fileIndex].variables.splice(varIndex, 1);
    setFormData({ ...formData, environmentFiles: newEnvs });
  };

  const handleEnvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n');
      const parsedVars = lines
        .filter(line => line.trim() && !line.trim().startsWith('#'))
        .map(line => {
          const [key, ...rest] = line.split('=');
          return {
            key: key.trim(),
            value: rest.join('=').trim().replace(/(^"|"$)|(^'|'$)/g, ''), // remove surrounding quotes
            description: '',
            isSecret: true,
          };
        })
        .filter(v => v.key);

      const newEnvs = [...formData.environmentFiles];
      newEnvs.push({
        name: file.name,
        environment: "Development",
        variables: parsedVars
      });
      setFormData({ ...formData, environmentFiles: newEnvs });
    };
    reader.readAsText(file);
    
    // reset input
    e.target.value = '';
  };

  const filteredProjects = projects.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.techStack && p.techStack.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
      
      {/* Project Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full h-full max-w-5xl rounded-xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border bg-muted/20">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Project' : 'New Project'}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8 bg-background">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-border pb-2">Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="My Project" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Slug (URL)</label>
                    <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="my-project" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-semibold mb-1 block">Description</label>
                    <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="Brief summary" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Icon (Emoji or URL)</label>
                    <input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="🚀" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Theme Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="bg-card border border-border rounded h-10 w-10 p-1 cursor-pointer" />
                      <input value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="flex-1 bg-card border border-border rounded p-2 font-mono text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-card border border-border rounded p-2">
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Visibility</label>
                    <select value={formData.visibility} onChange={e => setFormData({...formData, visibility: e.target.value})} className="w-full bg-card border border-border rounded p-2">
                      <option value="Private">Private</option>
                      <option value="Team">Team</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Code & Meta */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-border pb-2">Code & Meta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Tech Stack (comma separated)</label>
                    <input value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="React, Node.js, MongoDB" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Tags (comma separated)</label>
                    <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="ecommerce, dashboard" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">GitHub URL</label>
                    <input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Live URL</label>
                    <input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-card border border-border rounded p-2" placeholder="https://myproject.com" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-semibold mb-1 block">Local Path</label>
                    <input value={formData.localPath} onChange={e => setFormData({...formData, localPath: e.target.value})} className="w-full bg-card border border-border rounded p-2 font-mono text-sm" placeholder="/home/user/projects/..." />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <h3 className="text-lg font-semibold">Links</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addLink}><Plus className="w-3 h-3 mr-1" /> Add Link</Button>
                </div>
                {formData.links.map((link: any, i: number) => (
                  <div key={i} className="flex gap-2 items-center bg-muted/30 p-2 rounded-lg border border-border">
                    <input value={link.title} onChange={e => updateLink(i, 'title', e.target.value)} placeholder="Title (e.g. Figma)" className="flex-1 bg-background border border-border rounded p-2 text-sm" />
                    <select value={link.type} onChange={e => updateLink(i, 'type', e.target.value)} className="w-32 bg-background border border-border rounded p-2 text-sm">
                      <option value="GitHub">GitHub</option>
                      <option value="Production">Production</option>
                      <option value="Staging">Staging</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Figma">Figma</option>
                      <option value="Postman">Postman</option>
                      <option value="Jira">Jira</option>
                      <option value="Other">Other</option>
                    </select>
                    <input value={link.url} onChange={e => updateLink(i, 'url', e.target.value)} placeholder="https://..." className="flex-[2] bg-background border border-border rounded p-2 text-sm font-mono" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(i)} className="text-destructive shrink-0 h-8 w-8"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>

              {/* Credentials */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <h3 className="text-lg font-semibold">Credentials</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addCredential}><Plus className="w-3 h-3 mr-1" /> Add Credential</Button>
                </div>
                {formData.credentials.map((cred: any, i: number) => (
                  <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-muted/30 p-4 rounded-lg border border-border relative group">
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCredential(i)} className="text-destructive h-6 w-6"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <div className="col-span-2 md:col-span-4 pr-8">
                      <input value={cred.title} onChange={e => updateCredential(i, 'title', e.target.value)} placeholder="Title (e.g. Admin Login)" className="w-full bg-background border border-border rounded p-2 text-sm font-bold" />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <input value={cred.username} onChange={e => updateCredential(i, 'username', e.target.value)} placeholder="Username" className="w-full bg-background border border-border rounded p-2 text-sm" />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <input type="text" value={cred.password} onChange={e => updateCredential(i, 'password', e.target.value)} placeholder="Password" className="w-full bg-background border border-border rounded p-2 text-sm font-mono" />
                    </div>
                    <div className="col-span-2 md:col-span-4">
                      <input value={cred.note} onChange={e => updateCredential(i, 'note', e.target.value)} placeholder="Note (optional)" className="w-full bg-background border border-border rounded p-2 text-sm" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Environment Files */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <h3 className="text-lg font-semibold">Environment Files</h3>
                  <div className="flex gap-2">
                    <label className="cursor-pointer">
                      <input type="file" accept=".env,.*" className="hidden" onChange={handleEnvFileUpload} />
                      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <Upload className="w-3 h-3 mr-1" /> Upload .env
                      </div>
                    </label>
                    <Button type="button" variant="outline" size="sm" onClick={addEnvFile}><Plus className="w-3 h-3 mr-1" /> Add Env File</Button>
                  </div>
                </div>
                {formData.environmentFiles.map((env: any, i: number) => (
                  <div key={i} className="bg-muted/10 p-4 rounded-lg border border-border">
                    <div className="flex gap-2 items-center mb-4">
                      <input value={env.name} onChange={e => updateEnvFile(i, 'name', e.target.value)} placeholder="Filename (e.g. .env.local)" className="flex-1 bg-background border border-border rounded p-2 font-mono font-bold" />
                      <select value={env.environment} onChange={e => updateEnvFile(i, 'environment', e.target.value)} className="w-48 bg-background border border-border rounded p-2">
                        <option value="Development">Development</option>
                        <option value="Staging">Staging</option>
                        <option value="Production">Production</option>
                        <option value="Test">Test</option>
                      </select>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeEnvFile(i)} className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    
                    <div className="space-y-2 pl-4 border-l-2 border-border/50">
                      {env.variables.map((v: any, vi: number) => (
                        <div key={vi} className="flex gap-2 items-center group">
                          <input value={v.key} onChange={e => updateEnvVar(i, vi, 'key', e.target.value)} placeholder="KEY" className="w-1/3 bg-background border border-border rounded p-1.5 text-xs font-mono uppercase" />
                          <span className="text-muted-foreground">=</span>
                          <input value={v.value} onChange={e => updateEnvVar(i, vi, 'value', e.target.value)} placeholder="value" className="flex-1 bg-background border border-border rounded p-1.5 text-xs font-mono" />
                          <label className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0 cursor-pointer">
                            <input type="checkbox" checked={v.isSecret} onChange={e => updateEnvVar(i, vi, 'isSecret', e.target.checked)} />
                            Secret
                          </label>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeEnvVar(i, vi)} className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="ghost" size="sm" onClick={() => addEnvVar(i)} className="text-xs h-7 mt-2"><Plus className="w-3 h-3 mr-1" /> Add Variable</Button>
                    </div>
                  </div>
                ))}
              </div>

            </form>
            <div className="p-4 border-t border-border bg-card shrink-0 flex justify-end">
              <Button type="submit" onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Project</Button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewing && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="text-3xl bg-muted p-2 rounded-lg">{activeProject.icon || "🚀"}</div>
                <div>
                  <h2 className="text-2xl font-bold">{activeProject.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {activeProject.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{activeProject.visibility} Project</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsViewing(false)}><X className="w-5 h-5" /></Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {activeProject.description && (
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-foreground">{activeProject.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Links */}
                {(activeProject.links || []).length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Links</h3>
                    <div className="space-y-2">
                      {activeProject.links.map((link: any, i: number) => (
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
                  {activeProject.techStack && activeProject.techStack.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.techStack.map((t: string) => (
                          <span key={t} className="px-2 py-1 bg-muted rounded text-xs font-mono">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeProject.tags && activeProject.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((t: string) => (
                          <span key={t} className="px-2 py-1 bg-background border border-border rounded text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Credentials */}
              {(activeProject.credentials || []).length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Credentials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProject.credentials.map((cred: any, i: number) => (
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
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleCopy(cred.password)}><Copy className="w-3 h-3" /></Button>
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
              {(activeProject.environmentFiles || []).length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Environment Files</h3>
                  <div className="space-y-4">
                    {activeProject.environmentFiles.map((env: any, i: number) => (
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
                              <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover/var:opacity-100" onClick={() => handleCopy(v.value)}><Copy className="w-3 h-3" /></Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Git Commits */}
              {(activeProject.localPath || activeProject.githubUrl) && (
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
            
            <div className="p-4 border-t border-border bg-card flex justify-between items-center shrink-0">
              <div className="flex gap-4">
                {activeProject.githubUrl && (
                  <a href={activeProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                    <GitBranch className="w-4 h-4" /> Repository
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
                    <ExternalLink className="w-4 h-4" /> Production
                  </a>
                )}
                {activeProject.localPath && (
                  <button onClick={() => handleCopy(activeProject.localPath)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                    <Terminal className="w-4 h-4" /> Copy Local Path
                  </button>
                )}
              </div>
              <Button onClick={(e) => { setIsViewing(false); openEditModal(activeProject, e); }} variant="outline">
                <Edit2 className="w-4 h-4 mr-2" /> Edit Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">Projects</h2>
            <p className="text-muted-foreground mt-2">Manage your active repositories, deployments, and environments.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="default" onClick={openNewModal}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects by name, description, or tech stack..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
          />
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-48 text-muted-foreground">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <Folder className="w-8 h-8 mb-2 opacity-50" />
            <p>No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: any) => (
              <div 
                key={project._id}
                onClick={() => openViewModal(project)}
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={(e) => openEditModal(project, e)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => handleDelete(project._id, e)}>
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
                        <button onClick={(e) => handleCopy(project.localPath, e)} className="ml-auto hover:text-foreground shrink-0"><Copy className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
