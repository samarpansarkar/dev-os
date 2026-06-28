"use client";

import { useState, useEffect } from "react";
import { Lock, Download, Upload, Plus, Filter, Copy, Eye, EyeOff, Trash2, History, AlertTriangle, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveProjectId } from "@/store/slices/globalSlice";

export function VaultClient() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const selectedProjectId = useSelector((state: RootState) => state.global.activeProjectId);

  
  // UI state
  const [activeEnv, setActiveEnv] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});

  // New Secret Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSecret, setNewSecret] = useState({
    key: '',
    value: '',
    envFileId: '',
    isSecret: true,
  });

  // Fetch Projects
  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const json = await res.json();
      return json.data || [];
    }
  });
  const projects = projectsData || [];

  // Set default project if none selected
  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      dispatch(setActiveProjectId(projects[0]._id));
    }
  }, [projects, selectedProjectId, dispatch]);

  // Fetch Vault Variables
  const { data: variablesData } = useQuery({
    queryKey: ['vault', selectedProjectId],
    queryFn: async () => {
      const res = await fetch(`/api/vault?projectId=${selectedProjectId}`);
      const json = await res.json();
      return json.data || [];
    },
    enabled: !!selectedProjectId
  });
  const variables = variablesData || [];

  // Fetch Audit Logs
  const { data: auditLogsData } = useQuery({
    queryKey: ['vaultAudit', selectedProjectId],
    queryFn: async () => {
      const res = await fetch(`/api/vault/audit?projectId=${selectedProjectId}`);
      const json = await res.json();
      return json.data || [];
    },
    enabled: !!selectedProjectId
  });
  const auditLogs = auditLogsData || [];

  const activeProject = projects.find((p: any) => p._id === selectedProjectId);
  
  // Extract unique environments from the project's envFiles
  const environments = activeProject?.environmentFiles 
    ? Array.from(new Set(activeProject.environmentFiles.map((f: any) => f.environment)))
    : [];

  useEffect(() => {
    if (environments.length > 0 && !environments.includes(activeEnv)) {
      setActiveEnv(environments[0] as string);
    }
  }, [environments, activeEnv]);

  const createAuditLog = useMutation({
    mutationFn: async (payload: any) => {
      await fetch('/api/vault/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaultAudit', selectedProjectId] });
    }
  });

  const handleReveal = (variable: any) => {
    const isRevealed = !!revealedSecrets[variable._id];
    setRevealedSecrets({ ...revealedSecrets, [variable._id]: !isRevealed });

    if (!isRevealed) {
      createAuditLog.mutate({
        projectId: selectedProjectId,
        targetKey: variable.key,
        action: 'revealed'
      });
    }
  };

  const handleCopy = (variable: any) => {
    navigator.clipboard.writeText(variable.value);
    
    createAuditLog.mutate({
      projectId: selectedProjectId,
      targetKey: variable.key,
      action: 'copied'
    });
  };

  const deleteSecret = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/vault/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault', selectedProjectId] });
      queryClient.invalidateQueries({ queryKey: ['vaultAudit', selectedProjectId] });
    }
  });

  const handleDelete = (variable: any) => {
    if (!confirm('Are you sure you want to delete this secret?')) return;
    deleteSecret.mutate(variable._id);
  };

  const createSecret = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['vault', selectedProjectId] });
        createAuditLog.mutate({
          projectId: selectedProjectId,
          targetKey: data.data.key,
          action: 'created'
        });
        setIsModalOpen(false);
        setNewSecret({ key: '', value: '', envFileId: '', isSecret: true });
      }
    }
  });

  const handleCreateSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecret.envFileId) {
      alert("Please select an environment file.");
      return;
    }
    createSecret.mutate({
      projectId: selectedProjectId,
      ...newSecret
    });
  };

  // Filter variables by active environment and search query
  const filteredVariables = variables.filter((v: any) => {
    // We need to match the variable's envFileId to the project's envFiles to check the environment
    const file = activeProject?.environmentFiles?.find((f: any) => f._id === v.envFileId);
    if (!file || file.environment !== activeEnv) return false;
    
    if (searchQuery && !v.key.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-background/50 p-6 lg:p-10 relative">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--color-primary),_transparent_70%)] -z-10"></div>
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-8 h-8 text-success" />
            <h2 className="text-4xl font-bold text-foreground leading-none tracking-tight">Environment Vault</h2>
          </div>
          <p className="text-muted-foreground">Securely manage and sync your application secrets and .env files.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Project Selector */}
          <div className="relative group">
            <select 
              value={selectedProjectId || ""} 
              onChange={e => dispatch(setActiveProjectId(e.target.value))}
              className="appearance-none bg-card border border-primary/30 rounded-lg pl-4 pr-10 py-2 text-sm font-semibold focus:outline-none focus:border-primary text-primary transition-colors cursor-pointer"
            >
              <option value="" disabled>Select a Project</option>
              {projects.map((p: any) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <Button disabled={!selectedProjectId} onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Secret
          </Button>
        </div>
      </div>

      {/* New Secret Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-md rounded-xl shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-xl font-bold">New Secret</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleCreateSecret} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Key</label>
                <input required value={newSecret.key} onChange={e => setNewSecret({...newSecret, key: e.target.value})} className="w-full bg-background border border-border rounded p-2 font-mono uppercase" placeholder="API_KEY" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Value</label>
                <input required value={newSecret.value} onChange={e => setNewSecret({...newSecret, value: e.target.value})} className="w-full bg-background border border-border rounded p-2 font-mono" placeholder="sk_live_..." />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Environment File</label>
                <select required value={newSecret.envFileId} onChange={e => setNewSecret({...newSecret, envFileId: e.target.value})} className="w-full bg-background border border-border rounded p-2">
                  <option value="">Select Env File...</option>
                  {activeProject?.environmentFiles?.map((f: any) => (
                    <option key={f._id} value={f._id}>{f.name} ({f.environment})</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isSecret" checked={newSecret.isSecret} onChange={e => setNewSecret({...newSecret, isSecret: e.target.checked})} />
                <label htmlFor="isSecret" className="text-sm cursor-pointer">Mask value (Secret)</label>
              </div>
              <div className="flex justify-end pt-4 mt-4 border-t border-border">
                <Button type="submit">Create Secret</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeProject ? (
        <>
          {/* Environment Tabs & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-border pb-4">
            <div className="flex gap-8 font-bold text-xs uppercase tracking-wider overflow-x-auto w-full md:w-auto scrollbar-hide">
              {environments.map((env: any) => (
                <button 
                  key={env} 
                  onClick={() => setActiveEnv(env)}
                  className={`pb-4 relative top-[17px] whitespace-nowrap transition-colors ${activeEnv === env ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {env}
                </button>
              ))}
              {environments.length === 0 && (
                <span className="text-muted-foreground pb-4">No environments configured</span>
              )}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  className="w-full bg-[#09090B] border border-border rounded pl-9 pr-3 py-1.5 font-mono text-sm text-foreground focus:border-primary focus:outline-none transition-all" 
                  placeholder="Filter keys..." 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Secrets List */}
          <div className="bg-card/40 backdrop-blur-md rounded-xl border border-border overflow-hidden mb-12 shadow-sm">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-border bg-muted/30 font-bold text-xs tracking-wider uppercase text-muted-foreground">
              <div>Key</div>
              <div>Value</div>
              <div className="text-right w-24">Actions</div>
            </div>
            
            <div className="flex flex-col max-h-[500px] overflow-y-auto">
              {filteredVariables.map((variable: any) => (
                <div key={variable._id} className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-border items-center hover:bg-muted/50 transition-colors group">
                  <div className="font-mono text-sm text-cyan-400 truncate pr-2">{variable.key}</div>
                  <div className="relative group/value cursor-pointer">
                    <div className={`font-mono text-sm truncate pr-8 bg-[#09090B] p-1.5 rounded border transition-colors ${revealedSecrets[variable._id] ? 'border-primary/50 text-foreground' : 'border-transparent group-hover/value:border-border text-muted-foreground'}`}>
                      {variable.isSecret && !revealedSecrets[variable._id] 
                        ? '•'.repeat(Math.min(40, variable.value.length || 20)) 
                        : variable.value || ' '}
                    </div>
                  </div>
                  <div className={`flex items-center justify-end gap-1 w-24 transition-opacity ${revealedSecrets[variable._id] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleCopy(variable)}><Copy className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className={`h-8 w-8 ${revealedSecrets[variable._id] ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'}`} onClick={() => handleReveal(variable)}>
                      {revealedSecrets[variable._id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(variable)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
              
              {filteredVariables.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No secrets found for this environment.
                </div>
              )}
            </div>
          </div>

          {/* Audit & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <History className="text-primary w-5 h-5" /> Access Audit Log
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {auditLogs.map((log: any) => (
                  <div key={log._id} className="flex items-start gap-4 py-2 border-b border-border/50">
                    <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">{log.user.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground font-semibold">{log.user}</span> {log.action} <span className="font-mono text-xs text-cyan-400 bg-muted px-1 rounded">{log.targetKey}</span>
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-1">
                        {new Date(log.createdAt).toLocaleString()} • {log.sourceIp}
                      </p>
                    </div>
                  </div>
                ))}
                {auditLogs.length === 0 && (
                  <p className="text-sm text-muted-foreground">No audit logs available for this project.</p>
                )}
              </div>
            </div>

            <div className="bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Vault Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Environment</span>
                    <span className="font-mono text-xs text-success bg-success/10 px-2 py-1 rounded border border-success/20 font-bold uppercase tracking-wider">{activeEnv || 'None'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Secrets</span>
                    <span className="font-mono text-base text-foreground font-semibold">{filteredVariables.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center gap-2 text-warning mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase tracking-wider">Security Note</span>
                </div>
                <p className="text-sm text-muted-foreground">Remember to rotate your secrets periodically.</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border rounded-xl">
          <Lock className="w-8 h-8 mb-4 opacity-50" />
          <p>Please select a project to view its vault.</p>
        </div>
      )}
    </div>
  );
}
