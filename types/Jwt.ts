export type JWTPayload = {
    role?: "AGENT" | "PLAYER";
    id?:string;
    name?: string;
    email?: string;
};