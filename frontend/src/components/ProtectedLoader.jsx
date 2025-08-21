import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedLoader = () => {
  const navigate = useNavigate();
  const { utoken, isLoggedIn, openLogin } = useContext(AppContext);
  useEffect(() => {
    if (!utoken && !isLoggedIn) {
      openLogin();
      navigate("/"); // optional: send back to home after modal opens
    }
  }, [openLogin, navigate]);

  return <Outlet />;
};

const ProtectedRoute = () => {
  const { utoken, isLoggedIn, openLogin } = useContext(AppContext);
  if (!utoken && !isLoggedIn) {
    openLogin();
  }

  return null;
};

export { ProtectedLoader, ProtectedRoute };
