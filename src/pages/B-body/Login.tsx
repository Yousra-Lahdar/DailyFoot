import { Box, Button, Typography } from "@mui/material";
import Input from "../../components/compoLogin/Input.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { BASE_API_URL } from "../../../constants.ts";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(BASE_API_URL + "/auth/login", { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedPayload = JSON.parse(atob(base64));
            const role = decodedPayload.role;
            if (role === "PLAYER" || role === "AGENT" || role === "ADMIN") {
                localStorage.setItem("justLoggedIn", "true");
                navigate("/");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            console.log(error.response?.data || error.message);
            alert("Email ou mot de passe incorrect");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    height: "100vh",
                    width: "100%",
                }}
            >

                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#f69a03",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        px: { xs: 3, md: 6 },
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#ffffff", fontSize: { xs: 28, md: 50 } }}
                    >
                        BIENVENUE
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: "#ffffff",
                            fontSize: { xs: 20, md: 28 },
                            mt: { xs: 3, md: 4 },
                            lineHeight: 1.6,
                            maxWidth: 760,
                        }}
                    >
                        Gérez, suivez, connectez :<br />
                        tout est réuni sur DAILYFOOT.<br />
                        La plateforme incontournable pour<br />
                        les agents de foot qui veulent gagner<br />
                        du temps, rester proches de leurs joueurs<br />
                        et avoir toutes les infos clés à portée<br />
                        de main.<br />
                        Vos talents, votre réussite, notre outil.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        px: { xs: 3, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "100%", sm: 480, md: 520 },
                            maxWidth: 560,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            p: { xs: 2, md: 4 },
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f69a03", mb: 2 }}>
                            Se connecter
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            <img src="/logo-dailyfoot.png" alt="Logo" style={{ width: 120, borderRadius: 70 }} onClick={() => navigate("/home")} />
                        </Box>

                        <Box sx={{ mt: 2, width: "100%" }}>
                            <Input label="Email" name="username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>

                        <Box sx={{ mt: 2, width: "100%" }}>
                            <Input label="Mot de passe" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Box>

                        <Box sx={{ mt: 3, width: "100%", display: "flex", justifyContent: "center" }}>
                            <BtnLogin label="Valider" type="button" onClick={handleLogin} />
                        </Box>

                        <Box sx={{ mt: 2, display: "flex", flexDirection: { xs: "row", md: "column" }, alignItems: "center", gap: 1 }}>
                            <Button onClick={() => navigate("/forgetPass")} sx={{ color: "#f69a03" }}>Mot de passe oublié</Button>
                            <Button onClick={() => navigate("/register")} sx={{ color: "#f69a03" }}>Inscription</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
