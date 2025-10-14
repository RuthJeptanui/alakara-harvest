import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/user-service';
import { setToken } from '../utils/auth';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const { user } = await verifyEmail(token!);
        // If verifyEmail returns a token, update the service to include it, or remove setToken if not needed
        setSuccess('Email verified successfully! Redirecting to profile...');
        setTimeout(() => navigate('/profile'), 2000);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to verify email');
      }
    };
    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {!error && !success && <p>Verifying email...</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;