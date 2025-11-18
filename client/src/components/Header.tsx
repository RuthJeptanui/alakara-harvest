import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ALAKARA HARVEST
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Resources
          </Link>
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Market Data
          </Link>

          {/* Show "Get Started" and "Sign In" when signed out.
            The SignUpButton will open the Clerk modal.
          */}
          <SignedOut>
            <Link
              to="/dashboard" // Clerk's <SignInButton> can also be used here
              className="text-gray-600 hover:text-gray-800"
            >
              Sign In
            </Link>
            <SignUpButton mode="modal"  fallbackRedirectUrl={"/dashboard"}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>

          {/* Show the UserButton (avatar, sign out) when signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};