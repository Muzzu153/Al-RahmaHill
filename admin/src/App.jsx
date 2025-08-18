import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext.jsx";
import { AdminSidebar2 } from "./components/Sidebar.jsx";

const App = () => {
  const { atoken, isCollapsed } = useContext(AdminContext);
  const location = useLocation();

  // Redirect authenticated users away from login pages
  const isOnLoginPage =
    location.pathname === "/" || location.pathname === "/login";
  if (atoken && isOnLoginPage) {
    return <Navigate to="/admin-dashboard" replace />;
  }


  // Authenticated layout
  if (atoken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <div className="block items-start">
          <AdminSidebar2 className="border" />
          <div
            className={`min-h-screen transition-all duration-300 ease-in-out p-6 
              ${isCollapsed ? "md:ml-14" : "md:ml-64"} `}
          >
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated layout
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
