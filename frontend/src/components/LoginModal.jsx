// LoginModal.jsx - IMPROVED: Business Logic Component
import React, { useRef, useEffect, useContext, useState } from "react";
import AuthForm from "../components/AuthForm";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginModal() {
  const dialogRef = useRef();
  const {
    registerLoginRef,
    openSignup,
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    setUToken,
    user,
    setUser,
  } = useContext(AppContext);

  // ✅ Business Logic State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    registerLoginRef(dialogRef);
  }, [registerLoginRef]);

  const loginFields = [
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number",
      autoFocus: true,
      id: "login_phone",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      id: "login_password",
      required: true,
    },
  ];

  // ✅ Business Logic: Handle Login API
  const handleLogin = async (formData) => {
    try {
      console.log("🚀 Attempting login with:", { phone: formData.phone });

      const formDataToSend = {
        phone: formData.phone,
        password: formData.password,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        formDataToSend
      );

      if (data.success && data.utoken) {
        console.log("✅ Login successful");

        // Store token in localStorage AND update state with skip validation
        localStorage.setItem("utoken", data.utoken);
        setUToken(data.utoken, true); // Skip immediate validation

        // Set user data immediately from login response
        if (data.user) {
          setUser(data.user);
          setIsLoggedIn(true);
          console.log("👤 User set:", data.user.name);
        }

        // Close any open dialogs
        dialogRef.current?.reset();
        dialogRef.current.close();

        toast.success("Logged in successfully!");

        return { success: true, user: data.user };
      } else {
        const errorMessage = data.message || "Login failed";
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("🚨 Login error:", err);

      let errorMessage = "Login failed. Please try again.";

      if (err.response?.status === 401) {
        errorMessage = "Invalid phone or password";
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data.message || "Invalid input";
      } else if (err.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return (
    <AuthForm
      ref={dialogRef}
      mode="login"
      fields={loginFields}
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      footer={
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <button
            onClick={() => {
              dialogRef.current?.close();
              openSignup();
            }}
            disabled={loading}
            className="text-blue-600 hover:underline disabled:text-gray-400"
          >
            Sign up here
          </button>
        </p>
      }
    />
  );
}
