import React, { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar"
import LoginModal from './components/LoginModal';
import SignupModal from './components/SighupModal';
import Footer from "./components/Footer"
import { Outlet, useLocation } from 'react-router-dom';
import AppContextProvider, { AppContext } from './context/AppContext';

function Layout() {
  const location = useLocation();
  const { closeAll } = useContext(AppContext);

  useEffect(() => {
    closeAll();
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <LoginModal />
      <SignupModal />
      <Outlet />
      <Footer />
    </>
  );
}

// Loading component
const AuthLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Main App wrapper that handles auth loading
const AppWrapper = ({ children }) => {
  const { authLoading } = useContext(AppContext);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return <AuthLoadingSpinner />;
  }

  // Once auth check is complete, render the app
  return children;
};

// Usage in your main App component
const App = () => {
  return (
    <AppContextProvider>
      <AppWrapper>
        <Layout/>
      </AppWrapper>
    </AppContextProvider>
  );
};

// Alternative: Hook to use in components that need auth state
export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within AppContextProvider');
  }
  
  const { isLoggedIn, user, authLoading, logout } = context;
  
  return {
    isLoggedIn,
    user,
    loading: authLoading,
    logout,
    isAuthenticated: isLoggedIn && !authLoading
  };
};

// Protected Route component
export const ProtectedRoute = ({ children, fallback = null }) => {
  const { isLoggedIn, authLoading, openLogin } = useContext(AppContext);

  if (authLoading) {
    return <AuthLoadingSpinner />;
  }

  if (!isLoggedIn) {
    // Show fallback or trigger login dialog
    if (fallback) {
      return fallback;
    } else {
      // Auto-open login dialog
      setTimeout(() => openLogin(), 100);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Please log in to continue</h2>
            <button 
              onClick={openLogin}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default App;