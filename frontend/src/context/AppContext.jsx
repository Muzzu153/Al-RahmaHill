import { createContext, useRef, useState } from "react";
import { doctors } from "../assets/assets";
// import {}

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [utoken, setUToken] = useState(
    localStorage.getItem("utoken") ? localStorage.getItem("utoken") : ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointmentsList, setAppointmentList] = useState([]);
  const [user, setUser] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

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
    setUToken,
    user,
    setUser,
    appointmentsList,
    setAppointmentList,
    isPaid,
    setIsPaid
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
