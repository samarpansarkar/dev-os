import mongoose from 'mongoose';

export interface IVaultAudit extends mongoose.Document {
  projectId: mongoose.Types.ObjectId;
  targetKey: string;
  action: 'revealed' | 'copied' | 'created' | 'deleted' | 'updated';
  user: string;
  sourceIp: string;
  createdAt: Date;
}

const VaultAuditSchema = new mongoose.Schema<IVaultAudit>(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    targetKey: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ['revealed', 'copied', 'created', 'deleted', 'updated'],
      required: true,
    },
    user: {
      type: String,
      default: 'System User', // Default for local DevOS
    },
    sourceIp: {
      type: String,
      default: 'Localhost',
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

if (mongoose.models.VaultAudit) {
  delete mongoose.models.VaultAudit;
}

export const VaultAudit = mongoose.models.VaultAudit || mongoose.model<IVaultAudit>('VaultAudit', VaultAuditSchema);
