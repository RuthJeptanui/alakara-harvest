import { Schema, model } from 'mongoose';
import type { IProfile } from '../interfaces/dtos/profile-dtos.ts';

const profileSchema = new Schema<IProfile>({
  // This ID comes from Clerk and is our unique key
  clerkUserId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true, // Add an index for faster lookups
  },
  farmName: { 
    type: String, 
    default: '',
  },
  location: { 
    type: String, 
    default: '',
  },
  bio: { 
    type: String, 
    default: '',
  },
  mainCrops: {
    type: [String],
    default: [],
  }
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

export const Profile = model<IProfile>('Profile', profileSchema);