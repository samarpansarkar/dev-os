import mongoose from 'mongoose';

export interface IEnvironmentVariable {
  key: string;
  value: string;
  description?: string;
  isSecret?: boolean;
}

export interface IEnvironmentFile {
  name: string;
  environment: string;
  variables: IEnvironmentVariable[];
}

export interface IProjectLink {
  title: string;
  url: string;
  type: string;
}

export interface IProjectCredential {
  title: string;
  username: string;
  password?: string;
  note?: string;
}

export interface IProject extends mongoose.Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  status: 'Active' | 'Completed' | 'Archived' | 'On Hold';
  visibility: 'Private' | 'Team' | 'Public';
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  localPath?: string;
  tags: string[];
  isFavorite: boolean;
  environmentFiles: IEnvironmentFile[];
  links: IProjectLink[];
  credentials: IProjectCredential[];
  createdAt: Date;
  updatedAt: Date;
}

const EnvironmentVariableSchema = new mongoose.Schema<IEnvironmentVariable>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String },
    isSecret: { type: Boolean, default: false },
  },
  { _id: false }
);

const EnvironmentFileSchema = new mongoose.Schema<IEnvironmentFile>(
  {
    name: { type: String, required: true },
    environment: { type: String, required: true },
    variables: [EnvironmentVariableSchema],
  },
  { _id: false }
);

const ProjectLinkSchema = new mongoose.Schema<IProjectLink>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const ProjectCredentialSchema = new mongoose.Schema<IProjectCredential>(
  {
    title: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    note: { type: String },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '🚀' },
    color: { type: String, default: '#3b82f6' },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Archived', 'On Hold'],
      default: 'Active',
      required: true,
    },
    visibility: {
      type: String,
      enum: ['Private', 'Team', 'Public'],
      default: 'Private',
      required: true,
    },
    techStack: { type: [String], default: [] },
    githubUrl: { type: String },
    liveUrl: { type: String },
    localPath: { type: String },
    tags: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false },
    environmentFiles: { type: [EnvironmentFileSchema], default: [] },
    links: { type: [ProjectLinkSchema], default: [] },
    credentials: { type: [ProjectCredentialSchema], default: [] },
  },
  { timestamps: true }
);

if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
