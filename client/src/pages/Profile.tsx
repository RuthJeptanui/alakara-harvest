import React, { useState, useEffect } from 'react';
import { useUser, UserButton, useAuth } from '@clerk/clerk-react';

// Assuming you are using Shadcn/UI components
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

// Define the API base URL
const API_URL = 'http://localhost:3000/api'; // Change this to your backend URL

// This matches our backend interface
interface IFarmProfile {
  farmName: string;
  location: string;
  bio: string;
  mainCrops: string[];
}

const Profile: React.FC = () => {
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  
  const [profileData, setProfileData] = useState<IFarmProfile>({
    farmName: '',
    location: '',
    bio: '',
    mainCrops: [],
  });
  const [mainCropsInput, setMainCropsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch the farm-specific profile from our backend
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    // We need to get the token from Clerk to send to our backend
    const token = await getToken();
    
    try {
      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Send the token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data.');
      }
      
      const data: IFarmProfile = await response.json();
      setProfileData(data);
      setMainCropsInput(data.mainCrops.join(', '));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load profile data when component mounts and user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      fetchProfile();
    }
  }, [isLoaded, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleCropsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainCropsInput(e.target.value);
  };

  // Handle saving the farm-specific profile to our backend
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const token = await getToken();
    
    // Convert comma-separated string to array
    const mainCropsArray = mainCropsInput.split(',').map(crop => crop.trim()).filter(Boolean);

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...profileData, mainCrops: mainCropsArray }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      const updatedData: IFarmProfile = await response.json();
      setProfileData(updatedData);
      setMainCropsInput(updatedData.mainCrops.join(', '));
      setSuccess('Farm profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

      {/* Card 1: Core Account Settings (Handled by Clerk) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your email, password, and security settings.</CardDescription>
          </div>
          {/* This button opens Clerk's pre-built profile management modal */}
          <UserButton afterSignOutUrl="/" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {user?.fullName}</p>
            <p><span className="font-semibold">Email:</span> {user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: App-Specific Farm Profile (Handled by our Backend) */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Details</CardTitle>
          <CardDescription>This information is specific to Alakara Harvest.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              <Input
                id="farmName"
                name="farmName"
                value={profileData.farmName}
                onChange={handleInputChange}
                placeholder="e.g., Alakara Fields"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                placeholder="e.g., Makueni, Kenya"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Farm Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about your farm..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mainCrops">Main Crops</Label>
              <Input
                id="mainCrops"
                name="mainCrops"
                value={mainCropsInput}
                onChange={handleCropsChange}
                placeholder="e.g., Mangoes, Tomatoes, Oranges"
              />
              <p className="text-xs text-gray-500">Enter crops separated by a comma.</p>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Farm Details'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;