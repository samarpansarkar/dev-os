import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // Optional because OAuth users won't have a password
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      required: true,
      default: 'credentials', // 'credentials', 'google', 'github'
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
