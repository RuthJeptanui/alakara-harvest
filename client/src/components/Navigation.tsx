import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  //useUser, 
  UserButton, 
  SignedIn, 
  SignedOut 
} from '@clerk/clerk-react';

// --- Icons ---
import {
  Sprout,
  BookOpen,
  BarChart3,
  User,
  Menu,
  LogIn,
  UserPlus
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --- Shadcn/UI Components ---
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

// --- NavLink Interface ---
interface NavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, icon: Icon, mobile = false, onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-green-100 text-green-700'
          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
      } ${mobile ? 'text-base' : 'text-sm'}`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileLinkClick = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Alakara</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* PUBLIC LINKS (Visible when signed out) */}
            <SignedOut>
              <NavLink href="/" label="Home" icon={Sprout} />
              <NavLink href="/resources" label="Resources" icon={BookOpen} />
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <NavLink href="/login" label="Login" icon={LogIn} />
              <NavLink href="/register" label="Register" icon={UserPlus} />
            </SignedOut>

            {/* DASHBOARD LINKS (Visible when signed in) */}
            <SignedIn>
              <NavLink href="/dashboard" label="Market Data" icon={BarChart3} />
              <NavLink href="/profile" label="Profile" icon={User} />
              {/* You can keep resources visible for logged in users too if you want */}
               <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sprout className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-bold">Alakara</span>
                  </div>
                  
                  {/* PUBLIC MOBILE LINKS */}
                  <SignedOut>
                    <NavLink href="/" label="Home" icon={Sprout} mobile onClick={mobileLinkClick} />
                    <NavLink href="/resources" label="Resources" icon={BookOpen} mobile onClick={mobileLinkClick} />
                    <NavLink href="/login" label="Login" icon={LogIn} mobile onClick={mobileLinkClick} />
                    <NavLink href="/register" label="Register" icon={UserPlus} mobile onClick={mobileLinkClick} />
                  </SignedOut>

                  {/* DASHBOARD MOBILE LINKS */}
                  <SignedIn>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Dashboard</div>
                    <NavLink href="/dashboard" label="Market Data" icon={BarChart3} mobile onClick={mobileLinkClick} />
                    <NavLink href="/profile" label="Profile" icon={User} mobile onClick={mobileLinkClick} />
                    <NavLink href="/resources" label="Resources" icon={BookOpen} mobile onClick={mobileLinkClick} />
                    
                    <div className="border-t pt-4 mt-2">
                      <div className="flex items-center gap-2">
                        <UserButton afterSignOutUrl="/" />
                        <span className="text-sm font-medium text-gray-700">Account</span>
                      </div>
                    </div>
                  </SignedIn>
                  
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navigation;