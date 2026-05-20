import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import RequestLeave from "./pages/RequestLeave";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "/request-leave", element: <RequestLeave />},
    { path: "/dashboard", element: <UserDashboard /> },

]);

export default function App() {
    return <RouterProvider router={router} />;
}