import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMenu]);

  return (
    <div className="xs:hidden flex relative z-40">
      {/* Hamburger / Cross Icon */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`p-2 z-50  ${showMenu ? "hidden relative" : ""} `}
      >
        <svg
          className={`w-8 h-8 transition-transform duration-500 ${
            showMenu ? "rotate-90" : ""
          }`}
          viewBox="0 0 24 24"
          fill="#1F4E79"
          stroke={`${showMenu ? "white" : "#1F4E79"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {showMenu ? (
            <>
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="18" y2="12" />
              <line x1="3" y1="18" x2="15" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          showMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={menuRef}
          className={`w-[75%] max-w-xs h-full bg-primary text-white p-6 shadow-xl transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`xs:hidden flex flex-row w-full z-40 justify-between`}
          >
            <img
              src={assets.mobile_menu_logo}
              className={`z-50 w-15  ${showMenu ? "block" : "hidden"}`}
              alt=""
            />
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 z-50`}
            >
              <svg
                className={`w-8 h-8 transition-transform duration-500 ${
                  showMenu ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                fill="#1F4E79"
                stroke={`${showMenu ? "white" : "#1F4E79"}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showMenu ? (
                  <>
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="18" y2="12" />
                    <line x1="3" y1="18" x2="15" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
          <ul className="flex flex-col mt-15 gap-6 text-lg font-semibold">
            <NavLink to="/home" onClick={() => setShowMenu(false)}>
              <li className="hover:underline">HOME</li>
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
              <li className="hover:underline">DOCTORS</li>
            </NavLink>
            <NavLink to="/services" onClick={() => setShowMenu(false)}>
              <li className="hover:underline">SERVICES</li>
            </NavLink>
            <NavLink to="/my-appointments" onClick={() => setShowMenu(false)}>
              <li className="hover:underline">MY APPOINTMENTS</li>
            </NavLink>
            <NavLink to="/my-profile" onClick={() => setShowMenu(false)}>
              <li className="hover:underline">MY PROFILE</li>
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              <li className="hover:underline">ABOUT US</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
