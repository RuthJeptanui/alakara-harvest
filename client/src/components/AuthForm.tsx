import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { registerUser, loginUser } from '../services/user-service';
import { setToken } from '../utils/auth';
import type { IUser } from '../types/types';

interface AuthFormProps {
  type: 'register' | 'login';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<IUser>>({
    email: '',
    phoneNumber: '',
    profile: {
      firstName: '',
      lastName: '',
      farmName: '',
      location: { type: 'Point', county: '', subCounty: '', ward: '', coordinates: [0, 0] }, // Added type: 'Point'
      language: 'en',
    },
    crops: [{ cropId: '', cropName: '', varieties: [], farmSize: 0, averageYield: 0, harvestFrequency: '' }],
    preferences: { notificationsEnabled: true, smsAlerts: true, emailAlerts: true, preferredMarkets: [] },
  });
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      if (type === 'register') {
        const { token } = await registerUser(formData); // Removed unused user
        setToken(token);
        navigate('/profile');
      } else {
        const { token } = await loginUser({ emailOrPhone: formData.email || formData.phoneNumber || '', password }); // Ensured string type
        setToken(token);
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, subField] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...((prev[field as keyof typeof prev] as object) || {}),
          [subField]: subField === 'coordinates' ? value.split(',').map(Number) : value, // Handle coordinates as comma-separated input
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{type === 'register' ? 'Register' : 'Login'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <>
            <input
              type="text"
              name="profile.firstName"
              value={formData.profile?.firstName || ''}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="profile.lastName"
              value={formData.profile?.lastName || ''}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded"
              required
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
              required
            />
            <input
              type="text"
              name="profile.location.subCounty"
              value={formData.profile?.location.subCounty || ''}
              onChange={handleChange}
              placeholder="Sub-County"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="profile.location.ward"
              value={formData.profile?.location.ward || ''}
              onChange={handleChange}
              placeholder="Ward"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="profile.location.coordinates"
              value={formData.profile?.location.coordinates.join(',') || '0,0'}
              onChange={handleChange}
              placeholder="Coordinates (longitude,latitude)"
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="profile.language"
              value={formData.profile?.language || 'en'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="ki">Kikuyu</option>
            </select>
          </>
        )}
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        {type === 'register' && (
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {type === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;