import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import NavigationMenu, { QuickActions } from "./NavigationMenu";
// import ProfileDropdown, { ProfileButton } from "./ProfileDropdown";
import ProfileDropdown, { ProfileButton } from "./ProfileDropDown";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";
import { LogIn, User } from "lucide-react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

// Logo Component - Reusable across desktop and mobile
const Logo = ({ className = "", size = "default" }) => {
  const navigate = useNavigate();

  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    default: "w-10 h-10 text-base",
    large: "w-12 h-12 text-lg",
  };

  return (
    <button
      onClick={() => navigate("/")}
      className={`cursor-pointer text-base hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20 rounded-lg p-1 ${className}`}
      aria-label="Go to homepage"
    >
      <img className="w-44" src={assets.logo2} alt="" />
    </button>
  );
};

// Mobile Auth Button Component
// const MobileAuthButton = ({ className = "" }) => {
//   const { isLoggedIn } = useContext(AppContext);
//   const navigate = useNavigate();

//   if (isLoggedIn) {
//     return <ProfileButton className={className} />;
//   }

//   return (
//     <button
//       onClick={() => navigate("/login")}
//       className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20 ${className}`}
//       aria-label="Login"
//     >
//       <LogIn className="w-5 h-5 text-gray-600" />
//     </button>
//   );
// };

// Desktop Navigation Section
const DesktopNavigation = ({ className = "" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div
      className={`hidden lg:flex items-center justify-between w-full ${className}`}
    >
      {/* Left: Logo */}
      <div>
        <Logo />
      </div>

      {/* Center: Navigation Menu */}
      <div className="flex-1 flex  justify-center">
        <NavigationMenu />
      </div>

      {/* Right: Quick Actions + Profile */}
      <div className="flex items-center  gap-4">
        <QuickActions />
        <div className="relative">
          <ProfileButton
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            isOpen={isProfileOpen}
          />
          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

// Mobile Navigation Section
const MobileNavigation = ({ className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <div
        className={`lg:hidden flex items-center justify-between w-full ${className}`}
      >
        {/* Left: Hamburger Menu */}
        <HamburgerButton
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Logo showText={false} size="small" />
        </div>

        {/* Right: Profile/Login */}
        <div className="flex items-center  gap-4">
          <div className="relative">
            <ProfileButton
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              isOpen={isProfileOpen}
            />
            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

// Main Navbar Component
const Navbar = ({ className = "", sticky = true, showShadow = true }) => {
  return (
    <nav
      className={`bg-white border-b  border-gray-200 mb-4 z-30 ${
        sticky ? "sticky top-0" : ""
      } ${showShadow ? "shadow-sm" : ""} ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center">
          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
export { Logo, DesktopNavigation, MobileNavigation };
