import { createContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Initialize token from localStorage immediately
  const [utoken, setUToken] = useState(() => localStorage.getItem("utoken") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [appointmentsList, setAppointmentList] = useState([]);
  const [authLoading, setAuthLoading] = useState(true); // Track auth initialization

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "$";

  const loginDialogRef = useRef();
  const signupDialogRef = useRef();

  const registerLoginRef = (ref) => {
    loginDialogRef.current = ref.current;
  };

  const registerSignupRef = (ref) => {
    signupDialogRef.current = ref.current;
  };

  const openLogin = () => loginDialogRef.current?.open();
  const openSignup = () => signupDialogRef.current?.open();
  const closeLogin = () => loginDialogRef.current?.close();
  const closeSignup = () => signupDialogRef.current?.close();

  const closeAll = () => {
    loginDialogRef.current?.close();
    signupDialogRef.current?.close();
  };

  // Function to restore user session
  const restoreUserSession = async () => {
    const storedToken = localStorage.getItem("utoken");
    
    if (!storedToken) {
      console.log("🚫 No token found in localStorage");
      setAuthLoading(false);
      return;
    }

    try {
      console.log("🔍 Restoring session with stored token");
      
      const response = await axios.get(`${backendUrl}/api/user/me`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      const { data } = response;

      if (data.success && data.user) {
        console.log("✅ Session restored successfully for:", data.user.name);
        setUser(data.user);
        setIsLoggedIn(true);
        setUToken(storedToken); // Ensure state matches localStorage
      } else {
        console.log("❌ Invalid session, clearing stored data");
        // Clear invalid token
        localStorage.removeItem("utoken");
        setUToken("");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("🚨 Session restore failed:", error);
      
      // Only clear token if it's actually invalid (401/403)
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("🧹 Token invalid, clearing stored data");
        localStorage.removeItem("utoken");
        setUToken("");
        setIsLoggedIn(false);
        setUser(null);
      } else {
        // For network errors, keep the token and user logged in
        console.log("🌐 Network error, keeping user logged in");
        setIsLoggedIn(true); // Assume user is still logged in
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Run once on app initialization
  useEffect(() => {
    restoreUserSession();
  }, []); // Empty dependency array - only run once on mount

  // Track if we just logged in to avoid immediate validation
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Separate effect for when token changes during runtime (login/logout)
  useEffect(() => {
    if (utoken && !authLoading && !justLoggedIn) {
      // Only validate if we have a token, we're not in initial loading, and didn't just login
      const validateCurrentToken = async () => {
        try {
          console.log("🔍 Validating token during runtime...");
          const { data } = await axios.get(`${backendUrl}/api/user/me`, {
            headers: { Authorization: `Bearer ${utoken}` },
          });

          if (data.success && data.user) {
            setUser(data.user);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("🚨 Token validation failed:", error);
          // Only clear on auth errors
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("utoken");
            setUToken("");
            setIsLoggedIn(false);
            setUser(null);
          }
        }
      };

      validateCurrentToken();
    }
    
    // Reset the justLoggedIn flag after a short delay
    if (justLoggedIn) {
      const timer = setTimeout(() => {
        setJustLoggedIn(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [utoken, backendUrl, authLoading, justLoggedIn]);

  // Enhanced token update function
  const updateToken = (newToken, skipValidation = false) => {
    if (newToken) {
      localStorage.setItem("utoken", newToken);
      setUToken(newToken);
      
      // If this is from a login, skip immediate validation
      if (skipValidation) {
        setJustLoggedIn(true);
      }
    } else {
      localStorage.removeItem("utoken");
      setUToken("");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Optionally notify server
      if (utoken) {
        await axios.post(`${backendUrl}/api/user/logout`, {}, {
          headers: { Authorization: `Bearer ${utoken}` },
        });
      }
    } catch (error) {
      console.log("Logout notification failed:", error);
    } finally {
      // Clear all auth data
      localStorage.removeItem("utoken");
      setUToken("");
      setUser(null);
      setIsLoggedIn(false);
      console.log("👋 User logged out");
    }
  };

  const value = {
    doctors,
    currencySymbol,
    registerLoginRef,
    registerSignupRef,
    openLogin,
    openSignup,
    closeLogin,
    closeSignup,
    closeAll,
    backendUrl,
    setIsLoggedIn,
    isLoggedIn,
    utoken,
    setUToken: updateToken, // Use enhanced function
    user,
    setUser,
    appointmentsList,
    setAppointmentList,
    authLoading, // Expose loading state
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;