// SignupModal.jsx
import React, { useRef, useEffect, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AppContext } from "../context/AppContext";

export default function SignupModal() {
  const dialogRef = useRef();
  const { registerSignupRef, openLogin } = useContext(AppContext);

  useEffect(() => {
    registerSignupRef(dialogRef);
  }, [registerSignupRef]);

  const signupFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      autoFocus: true,
      id: "signup_email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      id: "signup_password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
      id: "signup_confirmPassword",
    },
  ];

  return (
    <AuthForm
      ref={dialogRef}
      mode="signup"
      fields={signupFields}
      onSubmit={(data) => {
        console.log("Signing up:", data);
        dialogRef.current?.close();
      }}
      footer={
        <p className="text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => {
              dialogRef.current?.close();
              openLogin();
            }}
            className="text-blue-600 hover:underline"
          >
            Log in here
          </button>
        </p>
      }
    />
  );
}
