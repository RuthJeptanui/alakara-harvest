import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";



function ProtectedRoute({  }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If auth is loaded and user is not signed in, redirect to sign-in
    // Pass the current location as `redirect_url`
    if (isLoaded && !isSignedIn) {
      navigate(`/sign-in?redirect_url=${location.pathname}`);
    }
  }, [isLoaded, isSignedIn, navigate, location.pathname]);

  // Show a loading state while Clerk is checking auth
  if (!isLoaded) {
    return (
      <div className="flex justify-center p-12">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  // If signed in, render the protected content
  return isSignedIn 
}

export default ProtectedRoute