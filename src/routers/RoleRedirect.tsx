import { Navigate } from "react-router";
import { getUserRole } from "../auth";

const RoleRedirect = () => {
    const role = (getUserRole() || "").toUpperCase();

    if (role === "AGENT") return <Navigate to="/agent" replace />;
    if (role === "PLAYER") return <Navigate to="/player" replace />;
    if (role === "ADMIN") return <Navigate to="/admin" replace />;

    return <Navigate to="/login" replace />;
};

export default RoleRedirect;
