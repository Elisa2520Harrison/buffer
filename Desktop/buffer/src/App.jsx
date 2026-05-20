import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import RequestLeave from "./pages/RequestLeave";
import MyLeaves from "./pages/MyLeaves";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "/request-leave", element: <RequestLeave />},
    { path: "/dashboard", element: <UserDashboard /> },
    { path: "/my-leaves", element: <MyLeaves />},
    { path: "/notifications", element: <Notifications />},
    { path: "/settings", element: <Settings />},

]);

export default function App() {
    return <RouterProvider router={router} />;
}