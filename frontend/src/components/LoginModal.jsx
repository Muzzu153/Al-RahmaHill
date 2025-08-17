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
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", formData);

      const formDataToSend = {
        phone: formData.phone,
        password: formData.password,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        formDataToSend
      );

      // ✅ Business Logic: Handle successful login

      // Store authentication token
      if (data.success) {
        setUToken(data.utoken);
        localStorage.setItem("utoken", data.utoken);
        setIsLoggedIn(!isLoggedIn);
        toast.success("Logged-in successfully");
        dialogRef.current?.reset();
        dialogRef.current.close();
        setUser(data.user)
        console.log("Login successful:", data.user.name);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (err) {
      // ✅ Business Logic: Handle login errors
      console.error("Login error:", err);

      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || "Invalid input");
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
