import { jwtDecode } from "jwt-decode";

type JWTPayload = {
    role?: "AGENT" | "PLAYER";
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
