import { jwtDecode } from "jwt-decode";

type JWTPayload = {
    role?: "AGENT" | "PLAYER";
    id?:string;
    name?: string;
    email?: string;
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("token");
};

export const getUserRole = (): "AGENT" | "PLAYER" | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded: JWTPayload = jwtDecode(token);
        return decoded.role ?? null;
    } catch {
        return null;
    }
};
export const getUserFromToken = (): JWTPayload | null =>
{
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return jwtDecode<JWTPayload>(token);
    } catch {
        return null;
    }
};
