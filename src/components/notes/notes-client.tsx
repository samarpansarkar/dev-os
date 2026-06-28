"use client";

import { useState, useEffect } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveProjectId } from "@/store/slices/globalSlice";

import { NotesExplorer } from "./notes-explorer";
import { NotesContent } from "./notes-content";

export function NotesClient() {
  const queryClient = useQueryClient();
  const selectedProjectId = useSelector((state: RootState) => state.global.activeProjectId);

  const [activeFolder, setActiveFolder] = useState<string>("General");
  const [activeNote, setActiveNote] = useState<any>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ "General": true });
  const [customFolders, setCustomFolders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<{title: string, content: string, tags: string, folder: string, linkedSnippets: string[]}>({ title: "", content: "", tags: "", folder: "", linkedSnippets: [] });

  const dispatch = useDispatch();

  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const json = await res.json();
      return json.data || [];
    }
  });
  const projects = projectsData || [];

  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      dispatch(setActiveProjectId(projects[0]._id));
    }
  }, [projects, selectedProjectId, dispatch]);

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', selectedProjectId],
    queryFn: async () => {
      const res = await fetch(`/api/notes?projectId=${selectedProjectId}`);
      const json = await res.json();
      return json.data || [];
    },
    enabled: !!selectedProjectId
  });

  const filteredNotes = (notesData || []).filter((n: any) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.content && n.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const folders = Array.from(new Set([...filteredNotes.map((n: any) => n.folder || "General"), ...customFolders]));
  if (!folders.includes("General")) folders.push("General");

  const saveNoteMutation = useMutation({
    mutationFn: async (payload: any) => {
      const isNew = !activeNote?._id;
      const url = isNew ? '/api/notes' : `/api/notes/${activeNote._id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, projectId: selectedProjectId })
      });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        setActiveNote(data.data);
        setIsEditing(false);
        setExpandedFolders(prev => ({ ...prev, [data.data.folder]: true }));
      } else {
        alert("Failed to save note: " + data.error);
      }
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setActiveNote(null);
    }
  });

  const handleSave = () => {
    saveNoteMutation.mutate({
      title: editForm.title.trim() || "Untitled Note",
      content: editForm.content,
      folder: editForm.folder || "General",
      tags: editForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      linkedSnippets: editForm.linkedSnippets || []
    });
  };

  const handleCreateFolder = () => {
    const name = prompt("Enter folder name:");
    if (name && name.trim() !== "") {
      const trimmed = name.trim();
      setCustomFolders(prev => Array.from(new Set([...prev, trimmed])));
      setExpandedFolders(prev => ({ ...prev, [trimmed]: true }));
    }
  };

  const startNewNote = (folder?: string) => {
    setActiveNote(null);
    setEditForm({ title: "", content: "", tags: "", folder: folder || activeFolder, linkedSnippets: [] });
    setIsEditing(true);
  };

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const deleteFolderMutation = useMutation({
    mutationFn: async (folder: string) => {
      await fetch(`/api/notes?projectId=${selectedProjectId}&folder=${encodeURIComponent(folder)}`, { method: 'DELETE' });
    },
    onSuccess: (_, folder) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setCustomFolders(prev => prev.filter(f => f !== folder));
      if (activeNote?.folder === folder) {
        setActiveNote(null);
        setIsEditing(false);
      }
    }
  });

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-background border border-border rounded-xl">
      <NotesExplorer
        isLoading={isLoading}
        folders={folders}
        filteredNotes={filteredNotes}
        expandedFolders={expandedFolders}
        activeNote={activeNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleFolder={toggleFolder}
        handleCreateFolder={handleCreateFolder}
        startNewNote={startNewNote}
        setActiveNote={setActiveNote}
        setIsEditing={setIsEditing}
        setActiveFolder={setActiveFolder}
        deleteFolder={(folder: string) => deleteFolderMutation.mutate(folder)}
        deleteNote={(id: string) => deleteNoteMutation.mutate(id)}
      />
      <NotesContent
        activeNote={activeNote}
        isEditing={isEditing}
        editForm={editForm}
        setEditForm={setEditForm}
        setIsEditing={setIsEditing}
        setActiveNote={setActiveNote}
        handleSave={handleSave}
        startNewNote={startNewNote}
        deleteNote={(id) => deleteNoteMutation.mutate(id)}
      />
    </div>
  );
}
