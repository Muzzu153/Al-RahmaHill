import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";

const AdminLayout = () => {
  const { aToken, isCollapsed } = useContext(AdminContext);
  // const {isCollapsed}

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content area - adjust margin based on sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out 
            ${!isCollapsed ? "ml-62" : "ml-14"}`}
      >
        <div className="p-6"></div>
      </div>
    </div>
  );
};

export default AdminLayout;
