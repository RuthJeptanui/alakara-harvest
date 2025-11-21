import { Request, Response } from 'express';
import { Profile } from '../models/profile.models';

// Extend the Express Request type to include the 'auth' object
// This is added by the Clerk 'requireAuth' middleware
interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
}

// Get (or create) the user's profile
export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the profile for this user
    let profile = await Profile.findOne({ clerkUserId });

    // If no profile exists, create one
    if (!profile) {
      profile = new Profile({
        clerkUserId,
        farmName: '',
        location: '',
        bio: '',
        mainCrops: []
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Update the user's profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { farmName, location, bio, mainCrops } = req.body;

    // Find and update the profile in one step
    // 'upsert: true' creates it if it doesn't exist
    // 'new: true' returns the updated document
    const updatedProfile = await Profile.findOneAndUpdate(
      { clerkUserId },
      { 
        farmName, 
        location, 
        bio,
        mainCrops 
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};