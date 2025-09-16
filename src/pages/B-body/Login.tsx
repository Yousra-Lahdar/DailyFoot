import {Box, Button, Typography} from "@mui/material";
import Input from "../../components/compoLogin/Input.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import {useNavigate} from "react-router";
import axios from "axios";
import {useState} from "react";
import {BASE_API_URL} from "../../../constants.ts";


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const response = await axios.post(BASE_API_URL + "/auth/login", {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            // Extraire le rôle depuis le JWT
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(base64));
            const role = decodedPayload.role; // ex: "PLAYER" ou "AGENT"

            // Dans Login.tsx
            if (role === "PLAYER" || role === "AGENT" || role === "ADMIN") {
                localStorage.setItem("justLoggedIn", "true");
                navigate("/");
            } else {
                navigate("/"); // fallback
            }
        } catch (error: any) {
            console.log(error.response?.data || error.message);
            alert("Email ou mot de passe incorrect");
        }

    };

    return (
        <Box sx={{  padding: "0vh" }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 21,
                    alignItems: "flex-start",
                    alignContent:"flex-start",

                }}
            >

                <Box
                    sx={{
                        width: 990,
                        height: 845,
                        backgroundColor: "#f69a03",
                        borderRadius: 0,
                        boxShadow:0,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{fontWeight: "bold", color: "#ffffff", textAlign: "center",mt:10,
                        fontSize: 50,}}
                    >
                        BIENVENUE
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ color: "#ffffff", textAlign: "center",mt:10,
                            fontSize: 35,}}
                    >
                        Gérez, suivez, connectez :<br/>
                        tout est réuni sur DAILYFOOT.<br/>
                        La plateforme incontournable pour<br/>
                        les agents de foot qui veulent gagner<br/>
                        du temps, rester proches de leurs joueurs<br/>
                        et avoir toutes les infos clés à portée<br/>
                        de main.<br/>
                        Vos talents, votre réussite, notre outil.
                    </Typography>
                </Box>


                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",mt:4 }}>

                    <Typography
                        variant="h5"
                        sx={{fontWeight: "bold", color: "#f69a03",}}
                    >
                        Se connecter
                    </Typography>


                    <Box
                        sx={{
                            width: 562,
                            height: 622,
                            backgroundColor: "#ffffff",
                            borderRadius: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            pt: 6,
                           // border:" 2px solid beige"
                        }}
                    >
                        <img
                            src="/logo-dailyfoot.png"
                            alt="Logo DailyFoot"
                            style={{ width: 120, borderRadius: 70 }}
                            onClick={() => navigate("/")}

                        />

                        <Box sx={{mt:6,display: "flex", alignItems: "center",}}>
                            <Input label="Email" name="username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box sx={{mt:2,display: "flex", alignItems: "center",}}>
                            <Input label="Mot de passe" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Box sx={{mt:3, display: "flex", alignItems: "center",gap: 4}}>
                            <BtnLogin label="Valider" type="button"  onClick={handleLogin} />
                        </Box>
                        <Box sx={{mt:1, display: "flex", flexDirection:"column", alignItems: "center",gap:1}}>
                            <Button type="submit" onClick={() => navigate("/forgetPass")} style={{color:"#f69a03"}} >Mot de passe oublié</Button>
                            <Button type="submit" onClick={() => navigate("/register")} style={{color:"#f69a03"}} >Inscription</Button>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>


    );
};

export default Login;

