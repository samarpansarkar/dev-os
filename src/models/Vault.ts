import mongoose from 'mongoose';

export interface IVault extends mongoose.Document {
  envFileId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  key: string;
  value: string;
  description?: string;
  category?: string;
  isSecret: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VaultSchema = new mongoose.Schema<IVault>(
  {
    envFileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    isSecret: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Vault) {
  delete mongoose.models.Vault;
}

export const Vault = mongoose.models.Vault || mongoose.model<IVault>('Vault', VaultSchema);
