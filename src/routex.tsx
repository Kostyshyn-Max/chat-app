import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "",
                element: <ProtectedRoute><HomePage /></ProtectedRoute>,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
        ]
    },
])