import { createBrowserRouter, Navigate } from "react-router";

// Layouts
import LayoutWithBarAgent from "../layout/LayoutWithBarAgent";
import LayoutWithBarPlayer from "../layout/LayoutWithBarPlayer";
import LayoutWithoutBar from "../layout/LayoutWithoutBar";

// Pages AGENT
import DashboardAgent from "../pages/B-body/DashboardAgent";
import Players from "../pages/B-body/Players";
import Agenda from "../pages/B-body/Agenda";
import Statistic from "../pages/B-body/Statistic";
import Setting from "../pages/B-body/Setting";
import Pay from "../pages/B-body/Pay";

// Pages PLAYER
import DashboardPlayer from "../pages/B-body/DashboardPlayer";

// Pages PUBLIC
import Login from "../pages/B-body/Login.tsx";
import ForgetPass from "../pages/B-body/ForgetPass.tsx";
import Register from "../pages/B-body/Register.tsx";
import ContactUs from "../pages/B-body/ContactUs";
import Home from "../pages/B-body/Home.tsx";

// Auth
import PrivateRoute from "./PrivateRoute.tsx";
import RoleRedirect from "./RoleRedirect.tsx";
import { fetchUserDetails } from "../../api/user.api.ts";

export const Router = createBrowserRouter([
    // Route racine protégée → redirige selon le rôle
    {
        path: "/",
        element: <PrivateRoute />, // vérifie seulement si connecté
        children: [
            { index: true, element: <RoleRedirect /> }, // dispatch vers /agent ou /player
        ],
    },

    // Routes AGENT
    {
        path: "/agent",
        element: <PrivateRoute allowedRoles={["AGENT"]} />,
        children: [
            {
                element: <LayoutWithBarAgent />,
                children: [
                    { index: true, element: <DashboardAgent /> },
                    { path: "players", element: <Players /> },
                    { path: "players/:id/agenda", element: <Agenda /> },
                    { path: "players/:id/statistic", element: <Statistic /> },
                    { path: "agenda", element: <Agenda /> },
                    { path: "setting", element: <Setting />, loader: fetchUserDetails },
                    { path: "pay", element: <Pay /> },
                ],
            },
        ],
    },

    // Routes PLAYER
    {
        path: "/player",
        element: <PrivateRoute allowedRoles={["PLAYER"]} />,
        children: [
            {
                element: <LayoutWithBarPlayer />,
                children: [
                    { index: true, element: <DashboardPlayer /> },
                    { path: "agenda", element: <Agenda /> },
                    { path: "statistic", element: <Statistic /> },
                    { path: "setting", element: <Setting />, loader: fetchUserDetails },
                ],
            },
        ],
    },

    // Routes publiques
    {
        path: "/",
        element: <LayoutWithoutBar />,
        children: [
            { index: true, element: <Navigate to="home" replace /> },
            { path: "home", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "forgetPass", element: <ForgetPass /> },
            { path: "register", element: <Register /> },
            { path: "contactUs", element: <ContactUs /> },
        ],
    },
]);

export default Router;
