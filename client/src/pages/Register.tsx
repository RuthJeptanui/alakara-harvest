import React from 'react';
import AuthForm from '../components/AuthForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="register" />
    </div>
  );
};

export default Register;