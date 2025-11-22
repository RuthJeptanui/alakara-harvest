import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  ClerkLoaded,
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from '@clerk/clerk-react';

// --- Import Our Pages & Components ---

import Profile from './pages/Profile';


import LandingPage from './pages/LandingPage';
import Resources from './pages/Resources';
import Dashboard from './pages/dashboard/DashboardPage';
import MainLayout from './components/MainLayout';
import AIChatbot from './components/AIChatBot';
// icons
import { MessageSquare } from 'lucide-react'; 
import Register from './pages/Register';
import Login from './pages/Login';
import TransportPage from './pages/Transport';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

/**
 * A layout component for routes that should only be accessible to signed-in users.
 * It renders the children (the protected page) if the user is signed in,
 * and redirects to the sign-in page if they are not.
 */
const ProtectedLayout = ({ redirectUrl, children }: { redirectUrl: string, children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={redirectUrl} />
      </SignedOut>
    </>
  );
};

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 relative">
          
          {/* --- Main Routes --- */}
          <Routes>
            {/* We use MainLayout for almost everything so the Navbar is always visible.
              The Navbar itself handles showing/hiding links based on auth state.
            */}
            <Route element={<MainLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/resources" element={<Resources />} />

              {/* Dashboard Routes (Protected) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedLayout redirectUrl="/dashboard">
                    <Dashboard />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedLayout redirectUrl="/profile">
                    <Profile />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/transport"
                element={
                  <ProtectedLayout redirectUrl="/transport">
                    <TransportPage />
                  </ProtectedLayout>
                }
              />
            </Route>

            {/* Auth Routes (No Navbar) */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex h-screen flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
                  <Link to="/" className="mt-4 text-blue-600 hover:underline">Go Home</Link>
                </div>
              }
            />
          </Routes>

          
          {/* Currently, the chatbot button is only shown when SignedIn. 
             However, since the chatbot connects to a specific user session, 
             it is best kept for authenticated users only.
          */}
          <SignedIn>
            <button
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-40 transition-transform hover:scale-105"
              aria-label="Open AI Farm Assistant"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          </SignedIn>

          {isChatOpen && (
            <AIChatbot onClose={() => setIsChatOpen(false)} />
          )}
          
        </div>
      </ClerkLoaded>
    </ClerkProvider>
  );
};
export default App;