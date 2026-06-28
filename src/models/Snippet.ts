import mongoose from 'mongoose';

export interface ISnippetBlock {
  type: 'code' | 'text' | 'note' | 'image' | 'command';
  content: string;
  filename?: string;
  language?: string;
}

export interface ISnippet extends mongoose.Document {
  title: string;
  description: string;
  language: string;
  projectId?: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isFavorite: boolean;
  blocks: ISnippetBlock[];
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema = new mongoose.Schema<ISnippet>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a snippet title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    language: {
      type: String,
      required: [true, 'Please provide a primary language'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a category'],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    tags: {
      type: [String],
      default: [],
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    blocks: {
      type: [
        new mongoose.Schema(
          {
            type: {
              type: String,
              enum: ['code', 'text', 'note', 'image', 'command'],
              required: true,
            },
            content: { type: String, required: true },
            filename: { type: String },
            language: { type: String },
          },
          { _id: false }
        ),
      ],
      validate: [
        (val: any[]) => val && val.length > 0,
        'Please provide at least one block of content',
      ],
    },
  },
  { timestamps: true }
);

// Force HMR to re-compile the model
if (mongoose.models.Snippet) {
  delete mongoose.models.Snippet;
}

export const Snippet = mongoose.models.Snippet || mongoose.model<ISnippet>('Snippet', SnippetSchema);
