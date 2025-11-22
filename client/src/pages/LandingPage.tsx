import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sprout, 
  TrendingDown, 
  BrainCircuit, 
  Truck, 
  Users, 
  Leaf, 
  BarChart3, 
} from 'lucide-react';
import { Button } from'../components/ui/button'; // Assuming you have this, or use standard HTML button
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- Hero Section --- */}
      <section className="relative bg-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-800/50 border border-green-600 text-green-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Leaf className="h-4 w-4" />
            <span>Supporting SDG 2: Zero Hunger</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Preserve Your Harvest, <br className="hidden md:block" />
            <span className="text-green-400">Secure Your Future</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            Alakara Harvest empowers Kenyan farmers to reduce post-harvest losses in mangoes, tomatoes, and oranges by up to 50%. 
            Use AI-driven insights to harvest smarter, store better, and sell for more.
          </p>
          
          {/* --- Updated Buttons to use Clerk --- */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <SignUpButton mode="modal">
              <Button size="lg" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white border-none text-lg px-8 py-6 h-auto cursor-pointer">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>

            <SignInButton mode="modal">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto bg-transparent cursor-pointer">
                Sign In
              </Button>
            </SignInButton>
          </div>

        </div>
      </section>

      {/* --- The Problem Statement --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1592878940765-7d2385924f3f?q=80&w=2070&auto=format&fit=crop" 
                alt="Wasted tomatoes" 
                className="rounded-2xl shadow-2xl object-cover h-[400px] w-full"
              />
              <div className="mt-6 p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center gap-3 mb-2 text-red-700 font-bold text-lg">
                  <TrendingDown className="h-6 w-6" />
                  The Reality
                </div>
                <p className="text-red-800/80 italic">
                  "Up to 50% of tomatoes and mangoes in Kenya never make it to the table."
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Silent Crisis in Our Fields
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Post-harvest loss is an alarmingly high barrier to prosperity for Kenyan smallholder farmers. 
                Almost half of the hard-earned produce—especially <strong>mangoes, tomatoes, and oranges</strong>—is lost before it can be sold.
              </p>
              <ul className="space-y-4">
                {[
                  "Poor harvesting techniques leading to damage",
                  "Inadequate storage facilities causing rapid spoilage",
                  "Inefficient transportation infrastructure",
                  "Limited access to fair markets"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px]">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-gray-600 font-medium">
                This doesn't just reduce income; it worsens food insecurity and hampers our progress toward SDG 2 (Zero Hunger).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- The Solution (Features) --- */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Innovative Solutions for Modern Farming
            </h2>
            <p className="text-lg text-gray-600">
              Alakara Harvest combines expert agricultural knowledge with cutting-edge AI to provide a personalized digital extension officer in your pocket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Assistant</h3>
              <p className="text-gray-600">
                Get instant, personalized answers on harvesting timing and techniques specifically for your crop variety and local weather conditions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Market Data</h3>
              <p className="text-gray-600">
                Make informed selling decisions with live price updates and demand forecasts. Know exactly when and where to sell for maximum profit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Logistics</h3>
              <p className="text-gray-600">
                Connect directly with vetted aggregation centers and transport providers to ensure your produce reaches the market safely and quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Crops Supported --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tailored for High-Value Perishables
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We focus on the crops that need the most care. Our platform provides specialized protocols for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Mangoes (All Varieties)",
                  "Tomatoes",
                  "Oranges & Citrus",
                  "Other Perishables"
                ].map((crop, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <Sprout className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">{crop}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1974&auto=format&fit=crop" alt="Mangoes" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=2070&auto=format&fit=crop" alt="Tomatoes" className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SDG Impact --- */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
            <Users className="h-8 w-8 text-green-300" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Empowering Farmers, Feeding the Nation</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            "By empowering farmers to preserve more of their harvest, we are directly contributing to SDG 2. 
            We are not just saving fruit; we are improving livelihoods and enhancing food security across Kenya."
          </p>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Reduce Your Losses?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of Kenyan farmers who are already using Alakara Harvest to improve their yield and income.
          </p>
          
          {/* --- Updated Button to use Clerk --- */}
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-10 py-6 h-auto rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer">
              Create Your Free Account
            </Button>
          </SignUpButton>

          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free for smallholder farmers
          </p>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Sprout className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">Alakara Harvest</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                A web-based platform tailored for Kenyan fruit and vegetable farmers to reduce post-harvest losses through AI-powered tools and market connections.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="hover:text-green-400 transition-colors">Market Data</Link></li>
                <li><Link to="/resources" className="hover:text-green-400 transition-colors">Resources</Link></li>
                {/* This link will trigger a redirect to login via ProtectedLayout if not signed in */}
                <li><Link to="/dashboard" className="hover:text-green-400 transition-colors">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-green-400 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-green-400 transition-colors">Contact</Link></li>
                <li><Link to="#" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Alakara Harvest. All rights reserved. Built for Kenya.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;