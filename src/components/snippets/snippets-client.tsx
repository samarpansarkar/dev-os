"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Folder, Terminal, Eye, Share, Copy, Sparkles, X, Save, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SnippetsClient() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSnippet, setActiveSnippet] = useState<any | null>(null);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, snipRes] = await Promise.all([
        fetch('/api/categories'),
        fetch(`/api/snippets${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`)
      ]);
      const catData = await catRes.json();
      const snipData = await snipRes.json();
      
      if (catData.success) setCategories(catData.data);
      if (snipData.success) {
        setSnippets(snipData.data);
        if (snipData.data.length > 0 && !activeSnippet) {
          setActiveSnippet(snipData.data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeCategory]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/snippets/${isEditing}` : '/api/snippets';
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setIsEditing(null);
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Derive unique languages
  const languages = Array.from(new Set(snippets.map(s => s.language))).map(name => {
    const count = snippets.filter(s => s.language === name).length;
    return { name, count, color: "bg-[#3178C6]" }; // default blue
  });

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden bg-background border border-border rounded-xl">
      
      {/* Snippet Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-2xl rounded-xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Snippet' : 'New Snippet'}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto scrollbar-hide">
              <div>
                <label className="text-sm font-semibold mb-1 block">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Description</label>
                <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1 block">Language</label>
                  <input required value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Category</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-background border border-border rounded p-2">
                    <option value="">Select a category</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Tags (comma separated)</label>
                <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Code Content</label>
                <textarea 
                  required 
                  value={formData.blocks[0].content} 
                  onChange={e => {
                    const newBlocks = [...formData.blocks];
                    newBlocks[0].content = e.target.value;
                    setFormData({...formData, blocks: newBlocks});
                  }} 
                  className="w-full bg-background border border-border rounded p-3 text-sm font-mono min-h-[200px]"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Snippet</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Sidebar */}
      <aside className="w-56 border-r border-border bg-card/50 hidden lg:flex flex-col h-full overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider uppercase">Languages</h2>
          <ul className="space-y-1">
            {languages.map((lang) => (
              <li key={lang.name}>
                <button className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors ${activeCategory === 'all' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
            {categories.map(cat => (
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

      {/* Snippet List */}
      <div className="w-full md:w-[320px] lg:w-[380px] border-r border-border bg-background flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{activeCategory === 'all' ? 'All Snippets' : categories.find(c => c._id === activeCategory)?.name || 'Snippets'}</h2>
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
        <div className="flex-1 overflow-y-auto">
          {snippets.map((snippet) => (
            <div 
              key={snippet._id} 
              onClick={() => setActiveSnippet(snippet)}
              className={`p-4 border-b border-border cursor-pointer transition-colors ${activeSnippet?._id === snippet._id ? 'bg-muted/50 border-l-2 border-l-primary' : 'bg-background hover:bg-muted/30 border-l-2 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-semibold text-sm truncate pr-4 ${activeSnippet?._id === snippet._id ? 'text-primary' : ''}`}>{snippet.title}</h3>
                <span className="font-mono text-xs text-muted-foreground shrink-0">{snippet.language}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {snippet.description}
              </p>
              <div className="flex items-center gap-2">
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

      {/* Preview Canvas */}
      <div className="flex-1 bg-background relative overflow-hidden flex flex-col p-4 lg:p-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        {activeSnippet ? (
          <div className="flex-1 bg-card/80 backdrop-blur-md border border-border rounded-xl flex flex-col overflow-hidden shadow-2xl relative z-10">
            {/* Toolbar */}
            <div className="h-14 border-b border-border bg-muted/30 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">{activeSnippet.blocks[0]?.filename || activeSnippet.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="h-8 shadow-primary/20" onClick={() => handleCopy(activeSnippet.blocks[0]?.content || "")}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
            
            {/* Layout: Code + Meta Sidebar */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-1 bg-[#09090B] overflow-auto relative group p-4 font-mono text-sm leading-[1.6]">
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#09090B] border-r border-border/30 text-right pr-2 pt-4 select-none text-muted-foreground/50 flex flex-col text-xs">
                  {Array.from({length: Math.max(22, (activeSnippet.blocks[0]?.content.split('\n').length || 0))}).map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <pre className="pl-10 m-0 text-gray-300 whitespace-pre-wrap break-all"><code>{activeSnippet.blocks[0]?.content || ""}</code></pre>
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
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-muted-foreground">
            <Terminal className="w-12 h-12 mb-4 opacity-20" />
            <p>Select a snippet to view its code</p>
          </div>
        )}
      </div>
    </div>
  );
}
