import { Navigate, Outlet } from "react-router";
import { isAuthenticated, getUserRole } from "../auth";

type PrivateRouteProps = {
    allowedRoles?: ("AGENT" | "PLAYER")[];
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {

    if (!isAuthenticated()) return <Navigate to="/login" replace />;


    const role = getUserRole();
    if (allowedRoles && role && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }


    return <Outlet />;
};

export default PrivateRoute;
