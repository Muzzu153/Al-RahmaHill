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
