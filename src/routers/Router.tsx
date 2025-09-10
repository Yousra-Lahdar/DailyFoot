import {createBrowserRouter, Navigate} from "react-router";

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
import {fetchUserDetails} from "../../api/user.api.ts";

export const Router = createBrowserRouter([
    // AGENT
    {
        element: <PrivateRoute allowedRoles={["AGENT"]}/>,
        children: [
            {
                path: "/1",
                element: <LayoutWithBarAgent/>,
                children: [
                    {index: true, element: <DashboardAgent/>},

                    // Liste des joueurs
                    {path: "players", element: <Players/>},

                    // Pages indépendantes pour chaque joueur
                    {path: "players/:id/agenda", element: <Agenda/>},
                    {path: "players/:id/statistic", element: <Statistic/>},

                    // Agenda global de l'agent
                    {path: "agenda", element: <Agenda/>},

                    {path: "setting", element: <Setting/>, loader: fetchUserDetails},
                    {path: "pay", element: <Pay/>},
                ],
            },
        ],
    },

    // PLAYER
    {
        element: <PrivateRoute allowedRoles={["PLAYER"]}/>,
        children: [
            {
                path: "/2",
                element: <LayoutWithBarPlayer/>,
                children: [
                    {index: true, element: <DashboardPlayer/>},
                    {path: "agenda", element: <Agenda/>},
                    {path: "statistic", element: <Statistic/>}, // ID du joueur
                ],
            },
        ],
    },

    // PUBLIC
    {
        path: "/",
        element: <LayoutWithoutBar/>,
        children: [
            {index: true, element: <Navigate to="Home" replace/>},
            {path: "Home", element: <Home/>},
            {path: "login", element: <Login/>},
            {path: "forgetPass", element: <ForgetPass/>},
            {path: "register", element: <Register/>},
            {path: "contactUs", element: <ContactUs/>},
        ],
    },
]);

export default Router;
