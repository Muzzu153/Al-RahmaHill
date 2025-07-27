// LoginModal.jsx
import React, { useRef, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { id } from "date-fns/locale";

export default function LoginModal() {
  const dialogRef = useRef();
  const { registerLoginRef, openSignup } = useContext(AppContext);

  useEffect(() => {
    registerLoginRef(dialogRef);
  }, [registerLoginRef]);

  const loginFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      autoFocus: true,
      id: "login_email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      id: "login_password",
    },
  ];

  return (
    <AuthForm
      ref={dialogRef}
      mode="login"
      fields={loginFields}
      onSubmit={(data) => {
        console.log("Logging in:", data);
        dialogRef.current?.close();
      }}
      footer={
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => {
              dialogRef.current?.close();
              openSignup();
            }}
            className="text-blue-600 hover:underline"
          >
            Sign up here
          </button>
        </p>
      }
    />
  );
}
