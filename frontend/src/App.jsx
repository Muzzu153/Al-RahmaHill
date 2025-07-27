import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SighupModal";
import AppContextProvider from "./context/AppContext";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <LoginModal />
      <SignupModal />
      <Outlet />
      <Footer/>
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
