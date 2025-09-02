import {Box, Button, Container, Typography} from "@mui/material";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import Imput from "../../components/compoLogin/Imput.tsx";
import {useNavigate} from "react-router";
import axios from "axios";
import {useState} from "react";
import {BASE_API_URL} from "../../../constants.ts";

const LoginPlayer = () => {

    const navigate = useNavigate();
    const [codeAccess, setCodeAccess] = useState("");
    const handleCodeAccess = async () => {
    try {
        const response =await axios.post(BASE_API_URL + "/auth/loginPlayer",
            {codeAccess: codeAccess});
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/2");
    }
    catch (error:any) {
        console.log(error.response?.data || error.message);
        alert("Le code d'accès est incorrect");
    }
    }
    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "center",
                }}
            >
                {/* Box gauche */}
                <Box
                    sx={{
                        width: 630,
                        height: 750,
                        backgroundColor: "#FEBC2F",
                        borderRadius: 2,
                        boxShadow:7
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{fontWeight: "bold", color: "#ffffff", textAlign: "center",mt:10,
                            fontSize: 40,}}
                    >
                        BIENVENUE
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ color: "#ffffff", textAlign: "center",mt:10,
                            fontSize: 25,}}
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

                {/* Partie droite avec titre + box */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    {/* Titre à l'extérieur */}
                    <Typography
                        variant="h5"
                        sx={{fontWeight: "bold", color: "#c06e04",}}
                    >
                        Se connecter
                    </Typography>

                    {/* Box droite */}
                    <Box
                        sx={{
                            width: 562,
                            height: 622,
                            backgroundColor: "#FFE0B2",
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            pt: 4,
                            boxShadow:7
                        }}
                    >
                        <img
                            src="/logo-dailyfoot.png"
                            alt="Logo DailyFoot"
                            style={{ width: 120, borderRadius: 70 }}
                        />
                        <Box sx={{mt:6, display: "flex", alignItems: "center",gap: 4}}>
                            <BtnLogin label="Agent" type="button" onClick={() => navigate("/3/login")} />
                            <BtnLogin label="Joueur" type="button" onClick={() => navigate("/3/loginPlayer")} />
                        </Box>

                        <Box sx={{mt:6,display: "flex", alignItems: "center",gap: 4}}>
                            <Imput label="Code d'accès" name="password"  type="password" value={codeAccess} onChange={(e) => setCodeAccess(e.target.value)} />
                        </Box>
                        <Box sx={{mt:10, display: "flex", alignItems: "center",gap: 4}}>
                            <BtnLogin label="Valider" type="button"  onClick={handleCodeAccess} />
                        </Box>
                        <Box sx={{mt:6, display: "flex", alignItems: "center",gap: 4}}>
                            <Button type="submit" onClick={() => navigate("/3/forgetPass")} style={{color:"#f69a03"}} >Mot de passe oubliée</Button>
                            <Button type="submit" onClick={() => navigate("/3/register")} style={{color:"#f69a03"}} >Inscription</Button>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPlayer;
