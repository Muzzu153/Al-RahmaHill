import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
 

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    atoken,
    setAToken,
    backendUrl,
    isCollapsed,
    setIsCollapsed,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
