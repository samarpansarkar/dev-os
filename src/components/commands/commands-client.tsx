"use client";

import { useState, useEffect } from "react";
import { Terminal, Plus, Search, Play, Copy, Star, History, Trash2, Edit2, X, Check, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/models/Category";
import { ICommand } from "@/models/Command";

export function CommandsClient() {
  const [commands, setCommands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    variants: [{ name: "Default", command: "" }],
    categoryId: "",
    tags: "",
  });

  // Category Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    color: "#3b82f6"
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, cmdRes] = await Promise.all([
        fetch('/api/categories'),
        fetch(`/api/commands${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`)
      ]);
      const catData = await catRes.json();
      const cmdData = await cmdRes.json();
      
      if (catData.success) setCategories(catData.data);
      if (cmdData.success) setCommands(cmdData.data);
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
    const url = isEditing ? `/api/commands/${isEditing}` : '/api/commands';
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setIsEditing(null);
        setFormData({ title: "", description: "", variants: [{ name: "Default", command: "" }], categoryId: "", tags: "" });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this command?')) return;
    try {
      const res = await fetch(`/api/commands/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryFormData)
      });
      const data = await res.json();
      if (data.success) {
        setIsCategoryModalOpen(false);
        setCategoryFormData({ name: "", description: "", color: "#3b82f6" });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (cmd: any) => {
    setFormData({
      title: cmd.title,
      description: cmd.description,
      variants: cmd.variants || [{ name: "Default", command: "" }],
      categoryId: cmd.categoryId._id || cmd.categoryId,
      tags: cmd.tags.join(', ')
    });
    setIsEditing(cmd._id);
    setIsModalOpen(true);
  };

  // Filter commands by search query
  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cmd.variants && cmd.variants.some((v: any) => v.command.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const [activeVariants, setActiveVariants] = useState<Record<string, number>>({});
  
  const handleVariantTab = (cmdId: string, index: number) => {
    setActiveVariants(prev => ({ ...prev, [cmdId]: index }));
  };

  const getActiveVariant = (cmd: any) => {
    const idx = activeVariants[cmd._id] || 0;
    return cmd.variants?.[idx] || { name: 'Default', command: 'No command' };
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
      {/* Category Modal Overlay */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-sm rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-xl font-bold">New Category</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCategoryModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleCategorySave} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Name</label>
                <input required value={categoryFormData.name} onChange={e => setCategoryFormData({...categoryFormData, name: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Description (optional)</label>
                <input value={categoryFormData.description} onChange={e => setCategoryFormData({...categoryFormData, description: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Color</label>
                <div className="flex gap-2 items-center">
                  <input type="color" required value={categoryFormData.color} onChange={e => setCategoryFormData({...categoryFormData, color: e.target.value})} className="bg-background border border-border rounded h-10 w-10 p-1 cursor-pointer" />
                  <span className="font-mono text-sm text-muted-foreground">{categoryFormData.color}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => setCategoryFormData({...categoryFormData, color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')})} className="ml-2">
                    Random
                  </Button>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Category</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Command' : 'New Command'}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Description</label>
                <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold block">Environment Variants</label>
                  <Button type="button" variant="outline" size="sm" onClick={() => setFormData({ ...formData, variants: [...formData.variants, { name: "", command: "" }] })}>
                    <Plus className="w-3 h-3 mr-1" /> Add Variant
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="flex gap-2 items-start bg-muted/20 p-2 rounded-lg border border-border">
                      <div className="w-1/3">
                        <input 
                          placeholder="e.g. npm, macOS" 
                          required 
                          value={variant.name} 
                          onChange={e => {
                            const newVariants = [...formData.variants];
                            newVariants[index].name = e.target.value;
                            setFormData({...formData, variants: newVariants});
                          }} 
                          className="w-full bg-background border border-border rounded p-2 text-sm" 
                        />
                      </div>
                      <div className="flex-1">
                        <textarea 
                          placeholder="Terminal command" 
                          required 
                          value={variant.command} 
                          onChange={e => {
                            const newVariants = [...formData.variants];
                            newVariants[index].command = e.target.value;
                            setFormData({...formData, variants: newVariants});
                          }} 
                          className="w-full bg-background border border-border rounded p-2 font-mono h-20 text-sm" 
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => {
                          if (formData.variants.length > 1) {
                            const newVariants = [...formData.variants];
                            newVariants.splice(index, 1);
                            setFormData({...formData, variants: newVariants});
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
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
              <div>
                <label className="text-sm font-semibold mb-1 block">Tags (comma separated)</label>
                <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-background border border-border rounded p-2" />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Command</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">Command Library</h2>
            <p className="text-muted-foreground mt-2">Manage, run, and share your terminal commands and scripts.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="default" onClick={() => { setIsEditing(null); setFormData({title: "", description: "", variants: [{ name: "Default", command: "" }], categoryId: "", tags: ""}); setIsModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Command
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search commands..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Collections</div>
              <button onClick={() => setIsCategoryModalOpen(true)} className="text-muted-foreground hover:text-primary transition-colors" title="Add Category">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-between transition-colors ${activeCategory === 'all' ? 'bg-card border-l-2 border-primary text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
            >
              <span className="flex items-center gap-2"><Star className="w-4 h-4" /> All Commands</span>
            </button>
            
            {categories.map(cat => (
              <button 
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-between transition-colors ${activeCategory === cat._id ? 'bg-card border-l-2 border-primary text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Commands List */}
          <div className="lg:col-span-9 space-y-4">
            
            {loading ? (
              <div className="flex items-center justify-center h-48 text-muted-foreground">Loading commands...</div>
            ) : filteredCommands.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                <Terminal className="w-8 h-8 mb-2 opacity-50" />
                <p>No commands found.</p>
              </div>
            ) : (
              filteredCommands.map((cmd) => (
                <div key={cmd._id} className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{cmd.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cmd.description}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(getActiveVariant(cmd).command)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(cmd)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cmd._id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {cmd.variants && cmd.variants.length > 1 && (
                    <div className="flex gap-1 mb-2 border-b border-border pb-2">
                      {cmd.variants.map((v: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleVariantTab(cmd._id, idx)}
                          className={`px-3 py-1 text-xs font-semibold rounded-t-md transition-colors ${
                            (activeVariants[cmd._id] || 0) === idx 
                              ? 'bg-primary/20 text-primary border-b-2 border-primary' 
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          }`}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="bg-[#09090B] rounded-lg p-3 border border-border overflow-x-auto">
                    <code className="font-mono text-sm text-cyan-400">{getActiveVariant(cmd).command}</code>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {cmd.categoryId?.name && (
                      <span className="px-2 py-1 rounded border border-border bg-background text-[10px] font-mono font-bold">
                        <span className="inline-block w-2 h-2 rounded-full mr-1" style={{backgroundColor: cmd.categoryId.color}} />
                        {cmd.categoryId.name}
                      </span>
                    )}
                    {cmd.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 rounded bg-muted text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
