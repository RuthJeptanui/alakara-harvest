import React from 'react';
import { Routes, Route, Link, 
  // Outlet,
  // useLocation,
  // Link,
  
  
   } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import VerifyEmail from './pages/VerifyEmail';
import LandingPage from './pages/LandingPage';
import { ClerkLoaded, ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';





 // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }



const App: React.FC = () => {


  


  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      
    >
      <ClerkLoaded>
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Clerk Sign In/Up Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* This route is usually handled by Clerk's email flow, but you can have a custom one */}
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <>
                  <SignedIn>
                    <Profile />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn redirectUrl="/profile" />
                  </SignedOut>
                </>
              }
            />

            <Route
              path="/admin"
              element={
                <>
                  <SignedIn>
                    <Admin />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn redirectUrl="/admin" />
                  </SignedOut>
                </>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex h-screen flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold text-gray-800">
                    404 - Not Found
                  </h1>
                  <Link
                    to="/"
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Go Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      </ClerkLoaded>
    </ClerkProvider>
  );


};



export default App;
