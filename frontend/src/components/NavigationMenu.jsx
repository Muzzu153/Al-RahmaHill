import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Briefcase,
  Info,
  Phone,
  Calendar,
  Stethoscope,
} from "lucide-react";

const NavigationMenu = ({ 
  isMobile = false, 
  onItemClick,
  className = "" 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  // Navigation items configuration
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: Home,
      description: "Welcome page",
    },
    {
      id: "doctors",
      label: "Doctors",
      path: "/doctors",
      icon: Stethoscope,
      description: "Find our medical specialists",
    },
    {
      id: "services",
      label: "Services",
      path: "/services",
      icon: Briefcase,
      description: "Medical services offered",
    },
    {
      id: "about",
      label: "About",
      path: "/about",
      icon: Info,
      description: "About our hospital",
    },
    {
      id: "contact",
      label: "Contact Us",
      path: "/contact",
      icon: Phone,
      description: "Get in touch with us",
    },
  ];

  // Update active item based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeNavItem = navigationItems.find(item => {
      if (item.path === "/" && currentPath === "/") return true;
      if (item.path !== "/" && currentPath.startsWith(item.path)) return true;
      return false;
    });
    
    setActiveItem(activeNavItem?.id || "");
  }, [location.pathname]);

  const handleNavigation = (item) => {
    navigate(item.path);
    setActiveItem(item.id);
    onItemClick?.(item);
  };

  if (isMobile) {
    return (
      <nav className={`flex  flex-col space-y-1 ${className}`} role="navigation" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex items-center gap-4 px-6 py-4 text-left rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-[#1F4E79] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#1F4E79]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon 
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive 
                    ? "text-white" 
                    : "text-gray-500 group-hover:text-[#1F4E79]"
                }`} 
              />
              <div className="flex-1">
                <span className={`font-medium text-base ${
                  isActive ? "text-white" : "text-gray-900 group-hover:text-[#1F4E79]"
                }`}>
                  {item.label}
                </span>
                <p className={`text-sm mt-0.5 ${
                  isActive ? "text-blue-100" : "text-gray-500"
                }`}>
                  {item.description}
                </p>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}

        {/* Quick Action Button for Mobile */}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={() => {
              navigate("/doctors2");
              onItemClick?.({ id: "book", label: "Book Appointment" });
            }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1F4E79] to-blue-600 text-white rounded-lg hover:from-[#1a3f66] hover:to-blue-700 transition-all duration-200 shadow-md"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Book Appointment</span>
          </button>
        </div>
      </nav>
    );
  }

  // Desktop Navigation
  return (
    <nav className={`flex  items-center space-x-1 ${className}`} role="navigation" aria-label="Main navigation">
      {navigationItems.map((item) => {
        const isActive = activeItem === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20 ${
              isActive
                ? "text-[#1F4E79]"
                : "text-gray-700 hover:text-[#1F4E79]"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
            
            {/* Active indicator line */}
            <div
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#1F4E79] transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
            
            {/* Hover effect */}
            <div className="absolute inset-0 rounded-lg bg-[#1F4E79] opacity-0 hover:opacity-5 transition-opacity duration-200" />
          </button>
        );
      })}
    </nav>
  );
};

// Separate component for Emergency Contact Button
const EmergencyButton = ({ className = "" }) => {
  return (
    <a
      href="tel:+1234567890"
      className={`fixed bottom-6 right-6 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-40 group ${className}`}
      aria-label="Emergency contact"
      title="Emergency: Call Now"
    >
      <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
    </a>
  );
};

// Quick Actions Component for Desktop
const QuickActions = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => navigate("/doctors2")}
        className="flex items-center gap-2 px-4 py-2 bg-[#1F4E79] lg:hidden xl:flex text-white rounded-lg hover:bg-[#1a3f66] transition-colors duration-200 font-medium"
      >
        <Calendar className="w-4 h-4" />
        <span className="hidden lg:inline">Book Appointment</span>
      </button>
    </div>
  );
};

export default NavigationMenu;
export { EmergencyButton, QuickActions };