import { createContext, useRef } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
