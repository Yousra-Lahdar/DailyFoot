import { Navigate, Outlet } from "react-router";
import { isAuthenticated, getUserRole } from "../auth";

type Role = "AGENT" | "PLAYER" | "ADMIN";

type PrivateRouteProps = {
    allowedRoles?: Role[];
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Normalisation → majuscules
    const role = (getUserRole() || "").toUpperCase() as Role;
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
