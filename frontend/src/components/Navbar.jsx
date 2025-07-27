import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const { openLogin } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);

  // Detect clicks outside the menu and icons
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target) &&
        (!closeRef.current || !closeRef.current.contains(e.target))
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const loginButtonFunction = function navigateToLoginAndSetToken() {
    setToken(false);
    openLogin;
  };

  return (
    <div className="flex relative items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <MobileMenu />
      <img
        onClick={() => navigate("/home")}
        className="w-32 sm:w-35 md:w-44 cursor-pointer"
        src={assets.logo2}
        alt="logo-image"
      />
      <ul className="hidden xs:flex items-start gap-5  font-medium">
        <NavLink className={"group transition duration-300"} to="/home">
          <li className="py-1">HOME</li>
          <hr className="border-none hidden outline-none hover: h-0.5 bg-primary w-3/5 m-auto"></hr>
        </NavLink>
        <NavLink className={"group transition duration-300"} to="doctors">
          <li className="py-1">DOCTORS</li>
          <hr className="border-none hidden outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>
        <NavLink className={"group transition duration-300"} to="/about">
          <li className="py-1 ">ABOUT</li>
          <hr className="border-none hidden outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>
        <NavLink className={"group transition duration-300"} to="contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none hidden outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center cursor-pointer gap-2 group relative">
            <img className="w-8 rounde-full" src={assets.profile_pic2} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black hover-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black hover-pointer"
                >
                  My Appintments
                </p>
                <p
                  onClick={loginButtonFunction}
                  className="hover:text-black hover-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={openLogin}
            className="bg-primary text-white rounded-full
           px-8 py-3 font-light hidden md:block"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
