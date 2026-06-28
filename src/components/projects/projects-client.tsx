"use client";

import { useState } from "react";
import { Plus, Search, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { ProjectViewModal } from "./project-view-modal";
import { ProjectEditModal } from "./project-edit-modal";

const EMPTY_FORM = {
  name: "", slug: "", description: "", icon: "🚀", color: "#3b82f6",
  status: "Active", visibility: "Private", techStack: "", githubUrl: "",
  liveUrl: "", localPath: "", tags: "", isFavorite: false,
  environmentFiles: [], links: [], credentials: []
};

export function ProjectsClient() {
  const queryClient = useQueryClient();

  // ─── Data Fetching ───────────────────────────────────────────
  const { data: projectsData, isLoading: loading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const json = await res.json();
      return json.data || [];
    }
  });
  const projects = projectsData || [];

  // ─── UI State ────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [formData, setFormData] = useState<any>({ ...EMPTY_FORM });

  // ─── Commits Query (for View Modal) ─────────────────────────
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

  // ─── Mutations ───────────────────────────────────────────────
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
      const { savedProject, formData: fd } = data;

      let allVariables: any[] = [];
      fd.environmentFiles.forEach((env: any, index: number) => {
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

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  // ─── Handlers ────────────────────────────────────────────────
  const handleCopy = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

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

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  const openEditModal = async (project: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    let vaultVariables: any[] = [];
    try {
      const res = await fetch(`/api/vault?projectId=${project._id}`);
      const data = await res.json();
      if (data.success) vaultVariables = data.data;
    } catch (err) {
      console.error('Failed to fetch vault variables', err);
    }

    const envFilesWithVars = (project.environmentFiles || []).map((file: any) => ({
      ...file,
      variables: vaultVariables.filter((v: any) => v.envFileId === file._id)
    }));

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

      const envFilesWithVars = (project.environmentFiles || []).map((file: any) => ({
        ...file,
        variables: vaultVariables.filter((v: any) => v.envFileId === file._id)
      }));

      setActiveProject({ ...project, environmentFiles: envFilesWithVars });
      setIsViewing(true);
    } catch (err) {
      console.error('Failed to fetch vault variables', err);
      setActiveProject(project);
      setIsViewing(true);
    }
  };

  const openNewModal = () => {
    setIsEditing(null);
    setFormData({ ...EMPTY_FORM });
    setIsModalOpen(true);
  };

  // ─── Filtered List ───────────────────────────────────────────
  const filteredProjects = projects.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.techStack && p.techStack.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <ProjectEditModal
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* View Modal */}
      {isViewing && activeProject && (
        <ProjectViewModal
          project={activeProject}
          commitsData={commitsData}
          commitsLoading={commitsLoading}
          onClose={() => setIsViewing(false)}
          onEdit={openEditModal}
          onCopy={handleCopy}
        />
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
              <ProjectCard
                key={project._id}
                project={project}
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
