import { Navigate, Outlet } from "react-router";
import { isAuthenticated, getUserRole } from "../auth";

type Role = "AGENT" | "PLAYER" | "ADMIN";

type PrivateRouteProps = {
    allowedRoles?: Role[];
};



const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const currentPath = window.location.pathname;

    if (!isAuthenticated()) {
        if (currentPath === "/") {
            return <Navigate to="/home" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    const role = (getUserRole() || "").toUpperCase() as Role;
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
