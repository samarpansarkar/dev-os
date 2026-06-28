import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Edit2, FileText, Link as LinkIcon, Plus, Save, Sparkles, Trash2, Code2, ExternalLink, Bold, Italic, Heading, List, Quote, Code } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NotesContentProps {
  activeNote: any;
  isEditing: boolean;
  editForm: any;
  setEditForm: (form: any) => void;
  setIsEditing: (isEditing: boolean) => void;
  setActiveNote: (note: any) => void;
  handleSave: () => void;
  startNewNote: () => void;
  deleteNote: (id: string) => void;
}

export function NotesContent({
  activeNote, isEditing, editForm, setEditForm,
  setIsEditing, setActiveNote, handleSave, startNewNote, deleteNote
}: NotesContentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editForm.content.substring(start, end);
    const newText = editForm.content.substring(0, start) + prefix + selectedText + suffix + editForm.content.substring(end);
    
    setEditForm({ ...editForm, content: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const selectedProjectId = useSelector((state: RootState) => state.global.activeProjectId);

  const { data: snippetsData } = useQuery({
    queryKey: ['snippets', selectedProjectId],
    queryFn: async () => {
      const res = await fetch(`/api/snippets?projectId=${selectedProjectId}`);
      const json = await res.json();
      return json.data || [];
    },
    enabled: !!selectedProjectId
  });
  const snippets = snippetsData || [];
  
  if (!activeNote && !isEditing) {
    return (
      <section className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-primary),_transparent_50%)]"></div>
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground z-10">
          <FileText className="w-16 h-16 mb-4 opacity-20" />
          <p>Select a note or create a new one</p>
          <Button className="mt-4" variant="outline" onClick={() => startNewNote()}>
            <Plus className="w-4 h-4 mr-2" /> New Note
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-primary),_transparent_50%)]"></div>
      
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
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => {
                setEditForm({
                  title: activeNote.title,
                  content: activeNote.content,
                  tags: activeNote.tags.join(', '),
                  folder: activeNote.folder,
                  linkedSnippets: activeNote.linkedSnippets?.map((s: any) => s._id || s) || []
                });
                setIsEditing(true);
              }}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
                if(confirm('Delete this note?')) deleteNote(activeNote._id);
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
              <div className="flex flex-col gap-2 mb-4 bg-muted/20 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <LinkIcon className="w-4 h-4" />
                  <span>Insert & Link Snippets</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editForm.linkedSnippets || []).map((id: string) => {
                    const snip = snippets.find((s: any) => s._id === id);
                    if (!snip) return null;
                    return (
                      <div key={id} className="flex items-center gap-2 bg-background border border-border px-2 py-1 rounded-md text-xs">
                        <Code2 className="w-3 h-3 text-primary" />
                        <span>{snip.title}</span>
                        <button 
                          onClick={() => setEditForm({...editForm, linkedSnippets: editForm.linkedSnippets.filter((sid: string) => sid !== id)})}
                          className="text-muted-foreground hover:text-destructive ml-1"
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })}
                </div>
                <select 
                  className="bg-background border border-border p-2 rounded text-sm outline-none focus:border-primary"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue) {
                      const isLinked = (editForm.linkedSnippets || []).includes(newValue);
                      setEditForm({
                        ...editForm,
                        linkedSnippets: isLinked ? editForm.linkedSnippets : [...(editForm.linkedSnippets || []), newValue],
                        content: editForm.content + `\n\n\`\`\`snippet\n${newValue}\n\`\`\`\n`
                      });
                    }
                    e.target.value = "";
                  }}
                >
                  <option value="">+ Insert a snippet into your note at the bottom...</option>
                  {snippets.filter((s: any) => !(editForm.linkedSnippets || []).includes(s._id)).map((s: any) => (
                    <option key={s._id} value={s._id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-lg border border-border w-fit">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => insertFormatting('# ', '')} title="Heading 1"><Heading className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => insertFormatting('**', '**')} title="Bold"><Bold className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => insertFormatting('*', '*')} title="Italic"><Italic className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => insertFormatting('`', '`')} title="Code"><Code className="w-4 h-4" /></Button>
                <div className="w-px h-4 bg-border mx-1"></div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => insertFormatting('- ', '')} title="Bullet List"><List className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => insertFormatting('> ', '')} title="Quote"><Quote className="w-4 h-4" /></Button>
              </div>

              <textarea 
                ref={textareaRef}
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
                      if (!inline && match && match[1] === 'snippet') {
                        const snippetId = String(children).trim();
                        const snipData = snippets.find((s:any) => s._id === snippetId);
                        if (snipData) {
                          return (
                            <div className="my-6 border border-border rounded-xl overflow-hidden bg-background">
                              <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-sm">{snipData.title}</span>
                              </div>
                              <div className="p-4">
                                {snipData.blocks?.map((block: any, idx: number) => {
                                  if (block.type === 'code') {
                                    return (
                                      <div key={idx} className="mb-4 last:mb-0">
                                        <SyntaxHighlighter style={vscDarkPlus as any} language={block.language || 'text'} className="rounded-md m-0">
                                          {block.content}
                                        </SyntaxHighlighter>
                                      </div>
                                    )
                                  }
                                  return <p key={idx} className="text-sm text-muted-foreground mb-4 last:mb-0">{block.content}</p>
                                })}
                              </div>
                            </div>
                          );
                        }
                      }
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
                {activeNote.linkedSnippets && activeNote.linkedSnippets.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <LinkIcon className="w-5 h-5 text-primary" />
                      Referenced Snippets
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeNote.linkedSnippets.map((snippet: any) => {
                        const snipData = typeof snippet === 'string' ? snippets.find((s:any) => s._id === snippet) : snippet;
                        if (!snipData) return null;
                        
                        return (
                          <div key={snipData._id} className="border border-border rounded-lg p-4 bg-muted/10 hover:bg-muted/20 transition-colors group cursor-pointer">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-primary" />
                                <h4 className="font-semibold text-sm truncate">{snipData.title}</h4>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{snipData.description}</p>
                            <div className="mt-3 flex gap-2">
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">{snipData.language}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
