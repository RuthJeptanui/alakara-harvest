import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 flex justify-center">
        {/* Redirect to /dashboard after successful sign up */}
        <SignUp forceRedirectUrl="/dashboard" signInUrl="/login" />
      </div>
    </div>
  );
};

export default Register;