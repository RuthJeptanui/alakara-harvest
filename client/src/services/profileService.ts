// Define the API base URL
// In production, use import.meta.env.VITE_API_URL
const API_URL = 'http://localhost:5000/api';

export interface IFarmProfile {
  farmName: string;
  location: string;
  bio: string;
  mainCrops: string[];
}

/**
 * Fetches the user's farm profile from the backend.
 * @param token The Clerk authentication token
 */
export const getProfile = async (token: string): Promise<IFarmProfile> => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch profile data`);
    }

    const data: IFarmProfile = await response.json();
    return data;
  } catch (error) {
    console.error("Profile Service - getProfile Error:", error);
    throw error;
  }
};

/**
 * Updates the user's farm profile on the backend.
 * @param token The Clerk authentication token
 * @param profileData The profile data to update
 */
export const updateProfile = async (token: string, profileData: IFarmProfile): Promise<IFarmProfile> => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to update profile`);
    }

    const updatedData: IFarmProfile = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Profile Service - updateProfile Error:", error);
    throw error;
  }
};