import { useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SighupModal";
import AppContextProvider, { AppContext } from "./context/AppContext";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

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

const App = () => {
  return (
    <div>
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </div>
  );
};

export default App;
