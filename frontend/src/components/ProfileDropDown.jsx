import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  LogOut,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";
import { AppContext } from "../context/AppContext";

const ProfileDropdown = ({ isOpen, onClose, className = "" }) => {
  //   const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { isLoggedIn, setIsLoggedIn, user, setUToken } = useContext(AppContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    // logout();
    navigate("/")
    onClose();
    setUToken(localStorage.removeItem("utoken"))
  };

  if (!isLoggedIn || !isOpen) return null;

  const menuItems = [
    {
      icon: Calendar,
      label: "My Appointments",
      path: "/my-appointments",
      description: "View and manage appointments",
    },
    {
      icon: User,
      label: "My Profile",
      path: "/my-profile",
      description: "Update personal information",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "/notifications",
      description: "View notifications",
      badge: 3, // Example notification count
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      description: "Account preferences",
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className={`absolute cursor-pointer right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 ${
        isOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
      } ${className}`}
      role="menu"
      aria-orientation="vertical"
    >
      {/* User Info Section */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#1F4E79] to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name }
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 group"
              role="menuitem"
            >
              <div className="w-5 h-5 text-gray-500 group-hover:text-[#1F4E79] transition-colors">
                <Icon className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 group-hover:text-[#1F4E79] transition-colors">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Section */}
      <div className="border-t border-gray-100 pt-2">
        <div
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors duration-150 group"
          role="menuitem"
        >
          <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
          <div onClick={()=>setIsLoggedIn(!isLoggedIn)} className="flex-1">
            <button className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
              Logout
            </button>
            <p className="text-xs text-gray-500">Sign out of your account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const getLoggedInState = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   return { isLoggedIn, setIsLoggedIn };
// };

// Profile Button Component

const handleLogIn =()=>{
  // setIsLoggedIn(!isLoggedIn)}
  // <LoginModal/>
  navigate("/login")
}

const ProfileButton = ({ onClick, isOpen, className = "" }) => {
    // const { user, isLoggedIn } = useContext(AppContext);
  const { isLoggedIn, openLogin, user } = useContext(AppContext);
  console.log(isLoggedIn)

  if (!isLoggedIn ) {
    return (
      <>
        <button
        onClick={openLogin}
          className="px-6 cursor-pointer hover:scale-105 hover:bg-[#153450] transition-all duration-300 py-2 font-semibold  rounded-lg bg-primary text-white border"
        >
          Login
        </button>
      </>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20 ${className}`}
      aria-label="User menu"
      aria-expanded={isOpen}
    >
      <div className="w-8 h-8 bg-gradient-to-r from-[#1F4E79] to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
      </div>

      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-xs text-white font-medium">3</span>
      </div>

      {/* Dropdown arrow - hidden on mobile */}
      <ChevronDown
        className={`w-4 h-4 text-gray-500 transition-transform duration-200 hidden sm:block ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
};

export default ProfileDropdown;
export { ProfileButton };
