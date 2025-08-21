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

// Add error boundary component for better error handling
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Router Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.href = '/login'} 
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Updated router configuration with error handling
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong! <a href="/login">Go to Login</a></div>,
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
      {
        // Catch-all route for 404s
        path: "*",
        element: <Login />, // or create a 404 component
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <RouterProvider router={route} />
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </ErrorBoundary>
  </StrictMode>
);