import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";

const router = createBrowserRouter([
    { path: "/", element: <UserDashboard /> },  
    
]);

export default function App() {
    return <RouterProvider router={router} />;
}