import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import NavigationMenu from "./NavigationMenu";
import { X, User, LogIn, LogOut, Settings, Bell } from "lucide-react";
import { assets } from "../assets/assets";

const user = {
  name: "user1",
  email: "user@email",
};

const isLoggedIn = false;

const MobileMenu = ({ isOpen, onClose, className = "" }) => {
//   const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const backdropRef = useRef(null);

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle swipe to close (basic implementation)
  useEffect(() => {
    let startX = 0;
    let currentX = 0;
    let isSwiper = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isSwiper = true;
    };

    const handleTouchMove = (e) => {
      if (!isSwiper) return;
      currentX = e.touches[0].clientX;
      const deltaX = startX - currentX;

      // Only allow closing swipe (swipe left)
      if (deltaX > 0 && menuRef.current) {
        const translateX = Math.min(deltaX, 320); // Max slide distance
        menuRef.current.style.transform = `translateX(-${translateX}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (!isSwiper) return;
      isSwiper = false;

      const deltaX = startX - currentX;
      if (deltaX > 100) {
        // Threshold for closing
        onClose();
      } else if (menuRef.current) {
        // Snap back
        menuRef.current.style.transform = "translateX(0)";
      }
    };

    if (isOpen && menuRef.current) {
      menuRef.current.addEventListener("touchstart", handleTouchStart);
      menuRef.current.addEventListener("touchmove", handleTouchMove);
      menuRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener("touchstart", handleTouchStart);
        menuRef.current.removeEventListener("touchmove", handleTouchMove);
        menuRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isOpen, onClose]);

  const handleNavItemClick = () => {
    onClose();
  };

  const handleLogout = () => {
    // logout();
    onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-80 max-w-[75vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10  rounded-full flex items-center justify-center">
              {/* <span className="text-white font-bold text-sm">H</span> */}
              <img src={assets.mobile_menu_logo} alt="" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">
                Al RahmaHill
              </h2>
              {/* <p className="text-xs text-gray-500">Medical Center</p> */}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Menu Content - Scrollable */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <NavigationMenu
              isMobile={true}
              onItemClick={handleNavItemClick}
              className="px-2"
            />
          </div>

          {/* Profile Section - Fixed at bottom */}
          <div className="border-t border-gray-200 bg-gray-50">
            {isLoggedIn ? (
              <div className="p-4 space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1F4E79] to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavigation("/my-profile")}
                    className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Profile</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("/settings")}
                    className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Settings</span>
                  </button>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* Login Section for Non-authenticated Users */
              <div className="p-4 space-y-3">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign in to access your appointments and profile
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="flex items-center justify-center gap-2 p-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#1a3f66] transition-colors duration-200 font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("/register")}
                    className="flex items-center justify-center gap-2 p-3 bg-white border border-[#1F4E79] text-[#1F4E79] rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>Register</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
          <div className="w-1 h-12 bg-gray-300 rounded-full opacity-50"></div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
