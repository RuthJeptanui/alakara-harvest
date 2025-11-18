
import React from 'react';
import { Link } from 'react-router-dom';
import {Header} from '../components/Header';


const LandingPage: React.FC = () => {
  return (
    <>
        <div>
            <Header/>
        </div>
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

        
      <div className="rounded-lg bg-white p-8 shadow">
      <h1 className="text-3xl font-bold">Welcome to MyApp</h1>
      <p className="mt-4 text-gray-700">
        This is the public landing page. Anyone can see this.
      </p>
      <div className="mt-6">
        <Link
          to="/dashboard"
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
    </div>
    </>
  );
};

export default LandingPage;

