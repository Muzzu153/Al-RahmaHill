
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";

let route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "my-appointments", element: <MyAppointments /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "appointments/:docId", element: <Appointment /> },
      {
        path: "doctors",
        element: <Doctors />,
        children: [
          { index: true, element: <Doctors /> },
          { path: ":speciality", element: <Doctors /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="mx-4 sm:mx-[10%]">
        <RouterProvider router={route} />
    </div>
  </StrictMode>
);
