import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export default App;
