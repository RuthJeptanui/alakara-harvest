import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/user-service';
import type { IUser } from '../types/types';
import { removeToken } from '../utils/auth';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<Partial<IUser>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
        setFormData({
          profile: profile.profile,
          crops: profile.crops,
          preferences: profile.preferences,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, subField] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [field]: { ...((prev[field as keyof typeof prev] as object) || {}), [subField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="profile.firstName"
          value={formData.profile?.firstName || ''}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="profile.lastName"
          value={formData.profile?.lastName || ''}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="profile.farmName"
          value={formData.profile?.farmName || ''}
          onChange={handleChange}
          placeholder="Farm Name (Optional)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="profile.location.county"
          value={formData.profile?.location.county || ''}
          onChange={handleChange}
          placeholder="County"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="profile.location.subCounty"
          value={formData.profile?.location.subCounty || ''}
          onChange={handleChange}
          placeholder="Sub-County"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="profile.location.ward"
          value={formData.profile?.location.ward || ''}
          onChange={handleChange}
          placeholder="Ward"
          className="w-full p-2 border rounded"
        />
        <select
          name="profile.language"
          value={formData.profile?.language || 'en'}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="sw">Swahili</option>
          <option value="ki">Kikuyu</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileForm;