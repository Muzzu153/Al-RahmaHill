import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
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
