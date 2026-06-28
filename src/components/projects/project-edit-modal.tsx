"use client";

import { Plus, X, Save, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface ProjectEditModalProps {
  isEditing: string | null;
  formData: any;
  setFormData: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function ProjectEditModal({
  isEditing,
  formData,
  setFormData,
  onSave,
  onClose,
}: ProjectEditModalProps) {

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
            value: rest.join('=').trim().replace(/(^"|"$)|(^'|'$)/g, ''),
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
    e.target.value = '';
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={isEditing ? 'Edit Project' : 'New Project'}
      maxWidth="max-w-5xl"
      fullHeight
      footer={
        <div className="flex justify-end">
          <Button type="submit" onClick={onSave}><Save className="w-4 h-4 mr-2" /> Save Project</Button>
        </div>
      }
    >
      <form onSubmit={onSave} className="p-6 space-y-8 bg-background">

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
    </Modal>
  );
}
