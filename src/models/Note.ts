import mongoose from 'mongoose';

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  folder: string;
  tags: string[];
  projectId: mongoose.Types.ObjectId;
  linkedSnippets: mongoose.Types.ObjectId[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new mongoose.Schema<INote>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a note title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      default: '',
    },
    folder: {
      type: String,
      default: 'General',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Note must belong to a project'],
      index: true,
    },
    linkedSnippets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Snippet'
    }],
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Force HMR to re-compile the model
if (mongoose.models.Note) {
  delete mongoose.models.Note;
}

export const Note = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
