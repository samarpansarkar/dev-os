import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, FilePlus, FileText, Folder, FolderPlus, Plus, Trash2 } from "lucide-react";

interface NotesExplorerProps {
  isLoading: boolean;
  folders: string[];
  filteredNotes: any[];
  expandedFolders: Record<string, boolean>;
  activeNote: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleFolder: (folder: string) => void;
  handleCreateFolder: () => void;
  startNewNote: (folder?: string) => void;
  setActiveNote: (note: any) => void;
  setIsEditing: (isEditing: boolean) => void;
  setActiveFolder: (folder: string) => void;
  deleteFolder: (folder: string) => void;
  deleteNote: (id: string) => void;
}

export function NotesExplorer({
  isLoading, folders, filteredNotes, expandedFolders, activeNote,
  searchQuery, setSearchQuery, toggleFolder, handleCreateFolder,
  startNewNote, setActiveNote, setIsEditing, setActiveFolder,
  deleteFolder, deleteNote
}: NotesExplorerProps) {
  return (
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
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 hover:text-destructive" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if(confirm(`Delete folder "${folder}" and all its notes?`)) deleteFolder(folder);
                    }}
                    title="Delete Folder"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5" 
                    onClick={(e) => { e.stopPropagation(); startNewNote(folder); }}
                    title="New Note in Folder"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
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
                      className={`group/note flex items-center justify-between p-1.5 cursor-pointer rounded transition-colors ${
                        activeNote?._id === note._id 
                          ? 'bg-muted/80 text-foreground border-l-2 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center overflow-hidden flex-1 pr-2">
                        <FileText className={`w-4 h-4 mr-2 shrink-0 ${activeNote?._id === note._id ? 'text-cyan-400' : ''}`} />
                        <span className="truncate">{note.title}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 opacity-0 group-hover/note:opacity-100 transition-opacity hover:text-destructive shrink-0" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if(confirm(`Delete note "${note.title}"?`)) deleteNote(note._id);
                        }}
                        title="Delete Note"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
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
  );
}
