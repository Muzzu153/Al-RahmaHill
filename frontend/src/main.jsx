import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile.jsx";
import Appointment from "./pages/Appointment";
import AboutUsPage from "./pages/About";
import ContactUsPage from "./pages/Contact";
import Services from "./pages/Services.jsx";
import {
  ProtectedLoader,
  ProtectedRoute,
} from "./components/ProtectedLoader.jsx";

let route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "contact", element: <ContactUsPage /> },
      {
        element: <ProtectedLoader />,
        children: [
          { path: "my-appointments", element: <MyAppointments /> },
          { path: "my-profile", element: <MyProfile /> },
        ],
      },
      { path: "appointments/:docId", element: <Appointment /> },
      { path: "services", element: <Services /> },
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
