import { Document } from 'mongoose';

export interface IProfile extends Document {
  clerkUserId: string; // This links to the Clerk user
  farmName: string;
  location: string;
  bio: string;
  mainCrops: string[];
}