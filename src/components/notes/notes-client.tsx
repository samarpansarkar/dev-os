"use client";

import { useState, useEffect } from "react";
import { Folder, FileText, ChevronRight, ChevronDown, Plus, FilePlus, FolderPlus, Sparkles, Bold, Italic, Code, Calendar, Clock, User, Tag, Link as LinkIcon, Save, Trash2, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveProjectId } from "@/store/slices/globalSlice";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const [editForm, setEditForm] = useState({ title: "", content: "", tags: "", folder: "" });

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
      tags: editForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
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
    setEditForm({ title: "", content: "", tags: "", folder: folder || activeFolder });
    setIsEditing(true);
  };

  const editCurrentNote = () => {
    if (!activeNote) return;
    setEditForm({
      title: activeNote.title,
      content: activeNote.content,
      tags: activeNote.tags.join(', '),
      folder: activeNote.folder
    });
    setIsEditing(true);
  };

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-background border border-border rounded-xl">
      
      {/* File Explorer Pane */}
      <aside className="w-64 border-r border-border bg-card/30 flex flex-col h-full overflow-hidden shrink-0">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Explorer</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={handleCreateFolder} title="New Folder">
              <FolderPlus className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => startNewNote()} title="New Note">
              <FilePlus className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <div className="px-4 py-2 border-b border-border">
          <input 
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-md px-2 py-1 text-xs outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2 font-mono text-sm text-muted-foreground">
          {isLoading ? (
            <div className="p-4 text-center text-xs opacity-50">Loading notes...</div>
          ) : folders.map((folder: any) => {
            const folderNotes = filteredNotes.filter((n: any) => (n.folder || "General") === folder);
            const isExpanded = !!expandedFolders[folder];
            return (
              <div key={folder} className="mb-1">
                <div 
                  className="flex items-center justify-between p-1.5 cursor-pointer rounded hover:bg-muted/50 transition-colors group"
                  onClick={() => toggleFolder(folder)}
                >
                  <div className="flex items-center overflow-hidden">
                    {isExpanded ? <ChevronDown className="w-4 h-4 mr-1 shrink-0" /> : <ChevronRight className="w-4 h-4 mr-1 shrink-0" />}
                    <Folder className="w-4 h-4 mr-2 text-primary shrink-0" />
                    <span className="truncate">{folder}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={(e) => { e.stopPropagation(); startNewNote(folder); }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                {isExpanded && (
                  <div className="pl-6">
                    {folderNotes.map((note: any) => (
                      <div 
                        key={note._id}
                        onClick={() => {
                          setActiveNote(note);
                          setIsEditing(false);
                          setActiveFolder(folder);
                        }}
                        className={`flex items-center p-1.5 cursor-pointer rounded transition-colors ${
                          activeNote?._id === note._id 
                            ? 'bg-muted/80 text-foreground border-l-2 border-primary' 
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <FileText className={`w-4 h-4 mr-2 ${activeNote?._id === note._id ? 'text-cyan-400' : ''}`} />
                        <span className="truncate">{note.title}</span>
                      </div>
                    ))}
                    {folderNotes.length === 0 && (
                      <div className="p-1.5 text-xs opacity-50 italic">Empty</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Editor Pane */}
      <section className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-primary),_transparent_50%)]"></div>
        
        {(!activeNote && !isEditing) ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground z-10">
            <FileText className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a note or create a new one</p>
            <Button className="mt-4" variant="outline" onClick={startNewNote}>
              <Plus className="w-4 h-4 mr-2" /> New Note
            </Button>
          </div>
        ) : (
          <>
            <div className="h-12 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10 shrink-0">
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
                <span>{isEditing ? editForm.folder : (activeNote?.folder || 'General')}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground">{isEditing ? editForm.title : activeNote?.title}</span>
              </div>
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => {
                      if (activeNote) setIsEditing(false);
                      else setActiveNote(null);
                    }}>Cancel</Button>
                    <Button variant="default" size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Summary
                    </Button>
                    <div className="w-px h-4 bg-border"></div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={editCurrentNote}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
                      if(confirm('Delete this note?')) deleteNoteMutation.mutate(activeNote._id);
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 lg:p-12 xl:p-16 relative z-10">
              <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-muted-foreground prose-headings:text-primary max-w-none h-full flex flex-col">
                {isEditing ? (
                  <div className="flex flex-col gap-4 h-full flex-1">
                    <input 
                      value={editForm.title}
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      placeholder="Note Title"
                      className="w-full text-4xl font-bold mb-4 text-foreground bg-transparent border-b-2 border-transparent hover:border-border focus:border-primary transition-colors outline-none pb-2 placeholder:text-muted-foreground/50"
                    />
                    <div className="flex gap-4 mb-4">
                      <input 
                        value={editForm.folder}
                        onChange={e => setEditForm({...editForm, folder: e.target.value})}
                        placeholder="Folder (e.g. Architecture)"
                        className="flex-1 bg-background border border-border p-2 rounded text-sm"
                      />
                      <input 
                        value={editForm.tags}
                        onChange={e => setEditForm({...editForm, tags: e.target.value})}
                        placeholder="Tags (comma separated)"
                        className="flex-1 bg-background border border-border p-2 rounded text-sm"
                      />
                    </div>
                    <textarea 
                      value={editForm.content}
                      onChange={e => setEditForm({...editForm, content: e.target.value})}
                      placeholder="Start typing your note here (Markdown supported)..."
                      className="w-full flex-1 min-h-[400px] bg-transparent border-none outline-none text-lg resize-none placeholder:text-muted-foreground/30 font-mono"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold mb-6 text-foreground">{activeNote.title}</h1>
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({node, inline, className, children, ...props}: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-md border border-border"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className="bg-muted px-1.5 py-0.5 rounded-md text-primary font-mono text-sm" {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {activeNote.content || "*Empty note...*"}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Metadata Sidebar */}
      {(!isEditing && activeNote) && (
        <aside className="w-72 border-l border-border bg-card/30 flex flex-col h-full overflow-y-auto shrink-0">
          <div className="p-4 border-b border-border">
            <h3 className="text-[10px] font-bold text-muted-foreground mb-4 tracking-wider uppercase">Page Properties</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <span className="w-24 text-muted-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Created</span>
                <span className="text-foreground">{new Date(activeNote.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-start">
                <span className="w-24 text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> Modified</span>
                <span className="text-foreground">{new Date(activeNote.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-muted-foreground flex items-center gap-1.5"><Tag className="w-4 h-4" /> Tags</span>
                <div className="flex flex-wrap gap-2">
                  {activeNote.tags?.map((tag: string, i: number) => (
                    <span key={i} className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-mono text-[11px]">{tag}</span>
                  ))}
                  {(!activeNote.tags || activeNote.tags.length === 0) && (
                    <span className="text-xs opacity-50">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
