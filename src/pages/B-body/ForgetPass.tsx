import {Box, Typography} from "@mui/material";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import Input from "../../components/compoLogin/Input.tsx";
import {useNavigate} from "react-router";
import {useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../../constants.ts";
import { toast } from "react-toastify";

const ForgetPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleClick = async () => {
        if (!email) {
            toast.error("Veuillez entrer votre email");
            return;
        }

        try {
            await axios.post(`${BASE_API_URL}/auth/forgot-password`, { email });
            toast.success("Un email avec votre nouveau mot de passe a été envoyé !");
            navigate("/Login"); // redirige vers la page de login
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Erreur lors de la réinitialisation du mot de passe");
        }
    };

    return (
        <div style={{
            background: "linear-gradient(16deg, rgba(192, 110, 4, 1) 23%, rgba(246, 154, 3, 1) 48%, rgba(255, 244, 158, 1) 72%, rgba(255, 224, 178, 1) 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column"
        }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", minHeight:"90vh" }}>
                <Typography variant="h5" sx={{fontWeight: "bold", color: "#c06e04", mb:2}}>
                    Mot de passe oublié
                </Typography>

                <Box sx={{
                    width: 512,
                    height: 390,
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 4,
                    boxShadow: 2,
                }}>
                    <img
                        src="/logo-dailyfoot.png"
                        alt="Logo DailyFoot"
                        style={{ width: 120, borderRadius: 70 }}
                    />

                    <Box sx={{ mt: 7, width: "80%" }}>
                        <Input
                            label="Email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <BtnLogin
                            label="Valider"
                            type="button"
                            onClick={handleClick}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default ForgetPass;
