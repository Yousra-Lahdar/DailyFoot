import { createBrowserRouter, Navigate } from "react-router";

// Layouts
import LayoutWithBarAgent from "../layout/LayoutWithBarAgent";
import LayoutWithBarPlayer from "../layout/LayoutWithBarPlayer";
import LayoutWithoutBar from "../layout/LayoutWithoutBar";

// Pages
import DashboardAgent from "../pages/B-body/DashboardAgent";
import Players from "../pages/B-body/Players";
import Agenda from "../pages/B-body/Agenda";
import Statistic from "../pages/B-body/Statistic";
import Setting from "../pages/B-body/Setting";
import Pay from "../pages/B-body/Pay";

import DashboardPlayer from "../pages/B-body/DashboardPlayer";

import Login from "../pages/B-body/Login.tsx";
import LoginPlayer from "../pages/B-body/LoginPlayer";
import ForgetPass from "../pages/B-body/ForgetPass.tsx";
import Register from "../pages/B-body/Register.tsx";
import ContactUs from "../pages/B-body/ContactUs.tsx";
import Home from "../pages/B-body/Home.tsx";

// Auth
import PrivateRoute from "./PrivateRoute.tsx";
import fetchUserDetails from "../../api/user.ts";

export const Router = createBrowserRouter([
    // AGENT
    {
        element: <PrivateRoute allowedRoles={["AGENT"]} />,
        children: [
            {
                path: "/1",
                element: <LayoutWithBarAgent />,
                children: [
                    { index: true, element: <DashboardAgent /> },
                    { path: "players", element: <Players /> },
                    { path: "agenda", element: <Agenda /> },
                    { path: "statistic", element: <Statistic /> },
                    {
                        path: "setting",
                        element: <Setting />,
                        loader: fetchUserDetails,
                    },
                    { path: "pay", element: <Pay /> },
                ],
            },
        ],
    },

    // PLAYER
    {
        element: <PrivateRoute allowedRoles={["PLAYER"]} />,
        children: [
            {
                path: "/2",
                element: <LayoutWithBarPlayer />,
                children: [
                    { index: true, element: <DashboardPlayer /> },
                    { path: "agenda", element: <Agenda /> },
                    { path: "statistic", element: <Statistic /> },
                ],
            },
        ],
    },

    // PUBLIC
    {
        path: "/",
        element: <LayoutWithoutBar />,
        children: [
            { index: true, element: <Navigate to="Home" replace /> },
            { path: "Home", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "loginPlayer", element: <LoginPlayer /> },
            { path: "forgetPass", element: <ForgetPass /> },
            { path: "register", element: <Register /> },
            { path: "contactUs", element: <ContactUs /> },
        ],
    },
]);

export default Router;
