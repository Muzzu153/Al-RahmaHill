import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext.jsx";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserPlus,
  Stethoscope,
  LogOut,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  X,
} from "lucide-react";
import { assets } from "../assets/assets.js";

// Custom Hamburger Menu Icon Component
const HamburgerIcon = ({ isOpen, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
    >
      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <>
            <div className="h-0.5 bg-gray-700 rounded transition-all duration-300 w-3"></div>
            <div className="h-0.5 bg-gray-700 rounded transition-all duration-300 w-4"></div>
            <div className="h-0.5 bg-gray-700 rounded transition-all duration-300 w-5"></div>
          </>
        )}
      </div>
    </button>
  );
};

// Logout Confirmation Popup Component
const LogoutConfirmation = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 transform transition-all">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <LogOut className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Confirm Logout
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to logout? You'll need to sign in again to
            access the admin panel.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const AdminSidebar2 = () => {
  const { atoken, setAToken, isCollapsed, setIsCollapsed } =
    useContext(AdminContext);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  // Don't render sidebar if admin is not logged in
  if (!atoken) {
    return null;
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin-dashboard",
    },
    {
      id: "appointments",
      label: "All Appointments",
      icon: Calendar,
      path: "/all-appointments",
    },
    {
      id: "doctors-list",
      label: "Doctors List",
      icon: Stethoscope,
      path: "/doctors-list",
    },
    {
      id: "add-doctors",
      label: "Add Doctors",
      icon: UserPlus,
      path: "/add-doctor",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setShowLogoutConfirm(false);
    navigate("/admin/login");
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleHamburgerIconOnClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Title above bar */}
        <div className="px-4 bg-white pt-4 pb-2 ">
          <h2 className="text-sm font-bold text-gray-600">Admin Panel </h2>
        </div>
        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
          <HamburgerIcon
            isOpen={isMobileMenuOpen}
            onClick={handleHamburgerIconOnClick}
          />

          {/* Collapsed navigation icons */}
          <div className="flex items-center space-x-2 flex-1 justify-center">
            {menuItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#1F4E79] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-primary rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <span className="text-white text-sm font-medium">A</span>
            </button>

            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">A</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Admin User</p>
                      <p className="text-sm text-gray-500">
                        administrator@hospital.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu - Navigation only */}
        <div
          className={`
    fixed inset-0 z-50 transition-opacity duration-500 bg-black/50 backdrop-blur 
    ${
      isMobileMenuOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu content */}
          <div
            className={`
      fixed top-0 left-0 right-0 z-50 bg-white shadow-xl overflow-y-auto
      transform transition-transform duration-500 ease-in-out
      ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}
    `}
          >
            {/* Header with logo */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-primary rounded-lg flex items-center justify-center p-1">
                <img src={assets.logo_for_sidebar} alt="Logo" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-500">AL RahmaHill</p>
              </div>
            </div>

            {/* Navigation items only */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#1F4E79] text-white shadow-md"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Click outside to close profile dropdown */}
        {isProfileDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsProfileDropdownOpen(false)}
          />
        )}
      </div>

      {/* Desktop Layout - Same as Option 2 */}
      <div className="hidden md:block  ">
        <div
          className={`fixed left-0 top-0 h-full bg-gray-50 border-r border-gray-200 shadow-lg transition-all duration-600 ease-in-out z-50 ${
            isCollapsed ? "w-16" : "w-64"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r p-1 from-blue-600 to-primary rounded-lg flex items-center justify-center">
                  <img src={assets.logo_for_sidebar} alt="" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Admin Panel
                  </h2>
                  <p className="text-xs text-gray-500">AL RahmaHill</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "#1F4E79" }}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {isCollapsed ? <ArrowRightFromLine /> : <ArrowLeftFromLine />}
              </div>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 rounded-lg transition-all duration-200 group ${
                    isCollapsed ? "p-2 justify-center" : "p-3"
                  } ${
                    isActive
                      ? "shadow-md hover:shadow-lg"
                      : "hover:bg-white hover:shadow-sm"
                  }`}
                  style={{
                    backgroundColor: isActive ? "#1F4E79" : "transparent",
                    color: isActive ? "white" : "#374151",
                  }}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon
                    className={`transition-colors ${
                      isCollapsed ? "w-6 h-6" : "w-5 h-5"
                    } ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-[#1F4E79]"
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`font-medium transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-[#1F4E79]"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div
              className={`flex items-center gap-3 p-3 rounded-lg bg-gray-50 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">
                    administrator@hospital.com
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className={`w-full mt-2 flex items-center gap-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
                isCollapsed ? "p-2 justify-center" : "p-3"
              }`}
              title={isCollapsed ? "Logout" : ""}
            >
              <LogOut className={`${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`} />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
};

export { AdminSidebar2 };
