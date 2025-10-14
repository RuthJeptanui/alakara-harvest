import React from 'react';
import UsersList from '../components/UserList';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UsersList />
    </div>
  );
};

export default Admin;