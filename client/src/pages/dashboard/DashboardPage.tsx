import { UserButton, useUser } from "@clerk/clerk-react";



const DashboardPage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
          {/* UserButton for profile/sign-out */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, {user?.firstName || user?.username}!
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            This is your protected dashboard. Only signed-in users can see this content.
          </p>
          {/* You can now fetch data from your Express backend here 
            using the useAuth() hook to get a token.
          */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
