import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
// import { AdminDashboard } from "./components/Sidebar.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "all-appointments",
        element: <AllAppointments />,
      },
      {
        path: "add-doctor",
        element: <AddDoctor />,
      },
      {
        path: "doctors-list",
        element: <DoctorsList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
            <RouterProvider router={route} />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </StrictMode>
);
