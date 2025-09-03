import {Box, Button, Typography} from "@mui/material";
import Imput from "../../components/compoLogin/Imput.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import {useNavigate} from "react-router";
import {useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../../constants.ts";

const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const handleRegister = async () => {
        try {
            await axios.post(BASE_API_URL + "/auth/register", {
                name,
                email,
                password
            });
            navigate("/login");
        } catch (error:any) {
            console.log(error.response?.data || error.message);
            alert("Email ou mot de passe incorrect");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column",
            justifyContent:"center",alignItems:"center",minHeight:"90vh" }}>

            <Typography
                variant="h5"
                sx={{fontWeight: "bold", color: "#c06e04",}}
            >
                S'inscrire
            </Typography>

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
                    boxShadow:7,

                }}
            >
                <img
                    src="/logo-dailyfoot.png"
                    alt="Logo DailyFoot"
                    style={{ width: 120, borderRadius: 70 }}
                />

                <Box sx={{mt:6,display: "flex", flexDirection:"column",justifyContent:"center",gap: 4}}>
                    <Imput label="Nom" name="Nom"  type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <Imput label="Email" name="Email"  type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Imput label="Mot de passe" name="password"  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Imput label="Confirmer Mot de passe" name="password"  type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Box>
                <Box sx={{mt:5, display: "flex", alignItems: "center",gap: 0}}>
                    <BtnLogin label="Valider" type="button" onClick={handleRegister} />
                </Box>
                <Box sx={{mt:0, display: "flex", alignItems: "center",gap: 4}}>
                    <Button type="submit" onClick={() => navigate("/Login")} style={{color:"#f69a03"}} >Page de connexion</Button>

                </Box>
            </Box>
        </Box>
    );
};

export default Register;
