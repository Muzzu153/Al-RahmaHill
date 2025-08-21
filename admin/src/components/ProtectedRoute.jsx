import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";

const ProtectedLoader = () => {
  const navigate = useNavigate();
  const { atoken } = useContext(AdminContext);
  useEffect(() => {
    if (!atoken ) {
      navigate("/"); // optional: send back to home after modal opens
    }
  }, [atoken]);

  return <Outlet />;
};

export default ProtectedLoader;
