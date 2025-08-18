import { assets } from "../assets/assets.js";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          setAToken(data.token);
          localStorage.setItem("atoken", data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    // <dialog open >
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto border-white items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl m-auto font-semibold">
          <span className="text-primary">{state} </span>Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full rounded-md text-base hover:cursor-pointer py-2">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline hover:cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline hover:cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
    // {/* </dialog> */}
  );
};

export default Login;
