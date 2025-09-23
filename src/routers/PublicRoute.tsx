import {Outlet} from "react-router";
import {isAuthenticated} from "../auth";
import RoleRedirect from "./RoleRedirect";

const PublicRoute = () => {
    if (isAuthenticated()) {
        return <RoleRedirect />;
    }
    return <Outlet />;
};

export default PublicRoute;
