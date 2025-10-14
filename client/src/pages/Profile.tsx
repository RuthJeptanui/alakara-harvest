import React from 'react';
import ProfileForm from '../components/ProfileForm';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ProfileForm />
    </div>
  );
};

export default Profile;