"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Folder, Terminal, Eye, Share, Copy, Sparkles, X, Save, Edit2, Trash2, PanelLeft, LayoutList, PanelLeftClose, ChevronLeft, Code, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function SnippetsClient() {
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSnippet, setActiveSnippet] = useState<any | null>(null);

  // Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isListOpen, setIsListOpen] = useState(true);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    language: "TypeScript",
    categoryId: "",
    tags: "",
    difficulty: "Intermediate",
    blocks: [{ type: "code", content: "", language: "typescript", filename: "index.ts" }]
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      const json = await res.json();
      return json.data || [];
    }
  });
  const categories = categoriesData || [];

  const { data: snippetsData, isLoading: loading } = useQuery({
    queryKey: ['snippets', activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/snippets${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`);
      const json = await res.json();
      return json.data || [];
    }
  });
  const snippets = snippetsData || [];

  useEffect(() => {
    if (snippets.length > 0 && !activeSnippet) {
      setActiveSnippet(snippets[0]);
    }
  }, [snippets, activeSnippet]);

  const filteredSnippets = snippets.filter((s: any) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const saveSnippetMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = isEditing ? `/api/snippets/${isEditing}` : '/api/snippets';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['snippets'] });
        setIsModalOpen(false);
        setIsEditing(null);
      }
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSnippetMutation.mutate({
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : formData.tags
    });
  };

  const deleteSnippetMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/snippets/${id}`, { method: 'DELETE' });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      if (activeSnippet?._id === id) setActiveSnippet(null);
    }
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this snippet?')) return;
    deleteSnippetMutation.mutate(id);
  };

  const openEditModal = (snippet: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      difficulty: snippet.difficulty,
      blocks: snippet.blocks || [{ type: "code", content: "", language: "javascript", filename: "" }],
      categoryId: snippet.categoryId?._id || snippet.categoryId,
      tags: snippet.tags.join(', ')
    });
    setIsEditing(snippet._id);
    setIsModalOpen(true);
  };

  const addBlock = (type: string) => {
    setFormData({
      ...formData,
      blocks: [...formData.blocks, { type, content: "", language: type === 'code' ? formData.language : undefined, filename: "" }]
    });
  };

  const removeBlock = (index: number) => {
    const newBlocks = [...formData.blocks];
    newBlocks.splice(index, 1);
    setFormData({ ...formData, blocks: newBlocks });
  };

  const updateBlock = (index: number, field: string, value: string) => {
    const newBlocks = [...formData.blocks];
    newBlocks[index][field] = value;
    setFormData({ ...formData, blocks: newBlocks });
  };

  // Derive unique languages
  const languages = Array.from(new Set(snippets.map((s: any) => s.language))).map((name: any) => {
    const count = snippets.filter((s: any) => s.language === name).length;
    return { name, count, color: "bg-[#3178C6]" }; // default blue
  });

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden bg-background border border-border rounded-xl">
      
      {/* Snippet Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-4xl rounded-xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Snippet' : 'New Snippet'}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleSave} className="p-4 space-y-6 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-semibold mb-1 block">Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded p-2" placeholder="e.g. NextAuth v5 Setup" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold mb-1 block">Description</label>
                  <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded p-2" placeholder="Brief summary" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Primary Language</label>
                  <input required value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full bg-background border border-border rounded p-2" placeholder="e.g. TypeScript" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Difficulty</label>
                  <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})} className="w-full bg-background border border-border rounded p-2">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Category</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-background border border-border rounded p-2">
                    <option value="">Select a category</option>
                    {categories.map((c: any) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Tags (comma separated)</label>
                  <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-background border border-border rounded p-2" placeholder="react, nextjs, auth" />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Snippet Blocks</h3>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('code')}><Code className="w-3 h-3 mr-1" /> Code</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('text')}><FileText className="w-3 h-3 mr-1" /> Text</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('note')}><MessageSquare className="w-3 h-3 mr-1" /> Note</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('command')}><Terminal className="w-3 h-3 mr-1" /> Cmd</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.blocks.map((block: any, index: number) => (
                    <div key={index} className="bg-muted/30 border border-border p-4 rounded-lg relative group">
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeBlock(index)} className="text-destructive h-7 w-7">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="mb-2 font-mono text-xs text-muted-foreground uppercase tracking-wider font-bold">
                        {block.type} Block
                      </div>

                      {block.type === 'code' && (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <input placeholder="Filename (e.g. useUser.ts)" value={block.filename || ""} onChange={e => updateBlock(index, 'filename', e.target.value)} className="bg-background border border-border rounded p-1 text-sm font-mono" />
                          <input placeholder="Language (e.g. typescript)" value={block.language || ""} onChange={e => updateBlock(index, 'language', e.target.value)} className="bg-background border border-border rounded p-1 text-sm font-mono" />
                        </div>
                      )}

                      <textarea 
                        required 
                        value={block.content} 
                        onChange={e => updateBlock(index, 'content', e.target.value)} 
                        className={`w-full bg-background border border-border rounded p-3 text-sm ${block.type === 'code' || block.type === 'command' ? 'font-mono min-h-[150px]' : 'font-sans min-h-[80px]'}`}
                        placeholder={`Enter ${block.type} content here...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 sticky bottom-0 bg-card py-4 border-t border-border mt-4">
                <Button type="submit" disabled={formData.blocks.length === 0}><Save className="w-4 h-4 mr-2" /> Save Snippet</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Sidebar */}
      {isSidebarOpen && (
        <aside className="w-56 border-r border-border bg-card/50 hidden lg:flex flex-col h-full overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Languages</h2>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={() => setIsSidebarOpen(false)}>
                <PanelLeftClose className="w-3 h-3" />
              </Button>
            </div>
            <ul className="space-y-1">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <button onClick={() => { setActiveCategory('all'); /* handle lang filter logic later if needed */ }} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors text-muted-foreground hover:bg-muted hover:text-foreground`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${lang.color}`}></span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </div>
                    <span className="font-mono text-xs opacity-70">{lang.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-border mt-auto">
            <h2 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider uppercase">Collections</h2>
            <ul className="space-y-1">
              <li>
                <button onClick={() => setActiveCategory('all')} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left text-sm ${activeCategory === 'all' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                  <Folder className="w-4 h-4" />
                  <span>All Snippets</span>
                </button>
              </li>
              {categories.map((cat: any) => (
                <li key={cat._id}>
                  <button onClick={() => setActiveCategory(cat._id)} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left text-sm ${activeCategory === cat._id ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="truncate">{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      {/* Snippet List */}
      {isListOpen && (
        <div className="w-full md:w-[320px] lg:w-[380px] border-r border-border bg-background flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{activeCategory === 'all' ? 'All Snippets' : categories.find((c: any) => c._id === activeCategory)?.name || 'Snippets'}</h2>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => setIsListOpen(false)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              <Button size="icon" variant="default" className="w-8 h-8 rounded-lg shadow-lg shadow-primary/20" onClick={() => {
                setIsEditing(null);
                setFormData({
                  title: "", description: "", language: "TypeScript", categoryId: activeCategory === 'all' ? "" : activeCategory, tags: "", difficulty: "Intermediate",
                  blocks: [{ type: "code", content: "", language: "typescript", filename: "index.ts" }]
                });
                setIsModalOpen(true);
              }}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                placeholder="Search snippets..." 
                className="w-full pl-8 pr-4 py-2 bg-background border border-border rounded-lg text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredSnippets.map((snippet: any) => (
              <div 
                key={snippet._id} 
                onClick={() => setActiveSnippet(snippet)}
                className={`p-4 border-b border-border cursor-pointer transition-colors group relative ${activeSnippet?._id === snippet._id ? 'bg-muted/50 border-l-2 border-l-primary' : 'bg-background hover:bg-muted/30 border-l-2 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold text-sm truncate pr-4 ${activeSnippet?._id === snippet._id ? 'text-primary' : ''}`}>{snippet.title}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={(e) => openEditModal(snippet, e)}>
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={(e) => handleDelete(snippet._id, e)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {snippet.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">{snippet.language}</span>
                  {snippet.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px] border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {snippets.length === 0 && !loading && (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No snippets found. Click the + button to create one!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Canvas */}
      <div className="flex-1 bg-background relative overflow-hidden flex flex-col p-4 lg:p-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="flex-1 bg-card/80 backdrop-blur-md border border-border rounded-xl flex flex-col overflow-hidden shadow-2xl relative z-10">
          {/* Toolbar (Always Visible) */}
          <div className="h-14 border-b border-border bg-muted/30 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              {!isSidebarOpen && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsSidebarOpen(true)}>
                  <PanelLeft className="w-4 h-4" />
                </Button>
              )}
              {!isListOpen && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsListOpen(true)}>
                  <LayoutList className="w-4 h-4" />
                </Button>
              )}
              {(!isSidebarOpen || !isListOpen) && <div className="w-px h-4 bg-border mx-1"></div>}
              
              {activeSnippet && (
                <>
                  <Terminal className="w-5 h-5 text-primary ml-1" />
                  <span className="font-semibold text-sm">{activeSnippet.title}</span>
                </>
              )}
            </div>
            
            {activeSnippet && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8" onClick={(e) => openEditModal(activeSnippet, e as any)}>
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </Button>
              </div>
            )}
          </div>
            
          {/* Content Area */}
          {activeSnippet ? (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-1 bg-[#09090B] overflow-auto relative group p-6 font-mono text-sm leading-[1.6] space-y-8">
                
                {activeSnippet.blocks.map((block: any, i: number) => (
                  <div key={i}>
                    {block.type === 'text' && (
                      <div className="prose prose-sm dark:prose-invert max-w-none font-sans">
                        <p className="text-foreground leading-relaxed text-base">{block.content}</p>
                      </div>
                    )}
                    
                    {block.type === 'note' && (
                      <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg font-sans">
                        <div className="flex gap-2 items-start text-blue-500 dark:text-blue-400">
                          <MessageSquare className="w-5 h-5 mt-0.5 shrink-0" />
                          <p className="text-sm font-medium">{block.content}</p>
                        </div>
                      </div>
                    )}
                    
                    {block.type === 'command' && (
                      <div className="bg-card/50 border border-border rounded-lg p-4 flex justify-between items-center shadow-sm">
                        <code className="font-mono text-cyan-400">{block.content}</code>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(block.content)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {block.type === 'code' && (
                      <div className="rounded-lg overflow-hidden border border-border/50">
                        <div className="bg-muted/80 px-4 py-2 flex justify-between items-center border-b border-border/50">
                          <span className="text-xs font-mono text-muted-foreground">{block.filename || block.language || 'Code'}</span>
                          <Button variant="ghost" size="sm" className="h-6 text-xs hover:bg-background" onClick={() => handleCopy(block.content)}>
                            <Copy className="w-3 h-3 mr-1" /> Copy
                          </Button>
                        </div>
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#09090B] border-r border-border/30 text-right pr-2 pt-4 select-none text-muted-foreground/30 flex flex-col text-xs">
                            {Array.from({length: Math.max(1, (block.content.split('\n').length))}).map((_, i) => <span key={i}>{i + 1}</span>)}
                          </div>
                          <div className="bg-[#09090B] p-4 pl-12 overflow-x-auto">
                            <pre className="font-mono text-sm text-green-400/90 whitespace-pre-wrap break-all m-0"><code>{block.content}</code></pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>

              {/* Meta Sidebar */}
              <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-muted/10 p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="bg-card border border-primary/30 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 blur-xl rounded-full"></div>
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Description</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeSnippet.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-muted-foreground mb-3 tracking-wider uppercase">Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="text-foreground flex items-center gap-2">{activeSnippet.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span className="text-foreground">{new Date(activeSnippet.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="text-foreground">{activeSnippet.categoryId?.name || "None"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-muted-foreground">
              <Terminal className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a snippet to view its code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
