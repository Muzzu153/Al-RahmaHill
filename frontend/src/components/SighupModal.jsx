// SignupModal.jsx - IMPROVED: Business Logic Component
import React, { useRef, useEffect, useContext, useState } from "react";
import AuthForm from "../components/AuthForm";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupModal() {
  const dialogRef = useRef();
  const { registerSignupRef, openLogin, backendUrl, setUToken, setIsLoggedIn, isLoggedIn } = useContext(AppContext);

  // ✅ Business Logic State
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    registerSignupRef(dialogRef);
  }, [registerSignupRef]);

  const signupFields = [
    {
      name: "name",
      label: "Name",
      type: "name",
      placeholder: "Enter your name",
      autoFocus: true,
      id: "signup_name",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number",
      id: "signup_phone",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password (min 6 characters)",
      id: "signup_password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
      id: "signup_confirmPassword",
      required: true,
    },
  ];

  // ✅ Business Logic: Handle Signup API
  const handleSignup = async (formData) => {
    setLoading(true);

    try {
      console.log("Attempting signup with:", formData);

      const formDataToSend = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      }

      const { data } = await axios.post(`${backendUrl}/api/user/signup`, formDataToSend );

      if (data.success) {
        setUToken(data.utoken)
        console.log(data)
        localStorage.setItem("utoken", data.utoken)
        setIsLoggedIn(!isLoggedIn)
        toast.success("user added successfully");
        dialogRef.current?.reset();
        dialogRef.current.close()
        console.log(data.message);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }



    } catch (err) {
      console.error("Signup error:", err);

      const status = err?.response?.status;

      if (status === 409) {
        toast.error(
          "Phone number already exists. Please use a different number."
        );
      } else if (status === 400) {
        toast.error(err.response?.data?.message || "Invalid input");
      } else if (
        err.code === "ECONNABORTED" ||
        err.message === "Network Error"
      ) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      ref={dialogRef}
      mode="signup"
      fields={signupFields}
      onSubmit={handleSignup}
      loading={loading}
      footer={
        <p className="text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => {
              dialogRef.current?.close();
              openLogin();
            }}
            disabled={loading}
            className="text-blue-600 hover:underline disabled:text-gray-400"
          >
            Log in here
          </button>
        </p>
      }
    />
  );
}
