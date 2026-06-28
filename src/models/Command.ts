import mongoose from 'mongoose';

export interface ICommand extends mongoose.Document {
  title: string;
  description: string;
  variants: { name: string; command: string }[];
  categoryId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommandSchema = new mongoose.Schema<ICommand>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a command title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    variants: {
      type: [
        new mongoose.Schema(
          {
            name: { type: String, required: true },
            command: { type: String, required: true },
          },
          { _id: false }
        ),
      ],
      validate: [
        (val: any[]) => val && val.length > 0,
        'Please provide at least one command variant',
      ],
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
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Force HMR to re-compile the model
if (mongoose.models.Command) {
  delete mongoose.models.Command;
}

export const Command = mongoose.models.Command || mongoose.model<ICommand>('Command', CommandSchema);
