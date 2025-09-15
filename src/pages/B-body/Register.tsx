import {Box, Button, Typography} from "@mui/material";
import Input from "../../components/compoLogin/Input.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import {useNavigate} from "react-router";
import {useState} from "react";
import axios, {type AxiosError} from "axios";
import {BASE_API_URL} from "../../../constants.ts";

const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleRegister = async () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = "Le nom est requis";
        if (!email) newErrors.email = "L’email est requis";
        if (!password) newErrors.password = "Le mot de passe est requis";
        if (password !== confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.post(BASE_API_URL + "/auth/register/agent", {
                name,
                email,
                password
            });
            navigate("/login");
        } catch (error) {
            const err = error as AxiosError<{message:string}>;
            console.log(error)
            setErrors({
                email: err.response?.data?.message || "Une erreur est survenue"
            });
        }
    };

    return (
        <div style={{
            background: "linear-gradient(16deg, rgba(192, 110, 4, 1) 23%, rgba(246, 154, 3, 1) 48%, rgba(255, 244, 158, 1) 72%, rgba(255, 224, 178, 1) 100%)",
            backgroundColor: "#C06E04",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            width: "100%",
            display: "flex", alignItems:"center",justifyContent:"center",flexDirection:"column"
        }}>
        <Box sx={{
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", minHeight: "90vh"
        }}>

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
                    backgroundColor: "rgba(255,255,255,0.91)",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 2,
                    boxShadow: 0,
                    pb:80
                }}
            >
                <img
                    src="/logo-dailyfoot.png"
                    alt="Logo DailyFoot"
                    style={{width: 120, borderRadius: 70}}
                    onClick={() => navigate("/login")}
                />

                <Box sx={{mt: 3, display: "flex", flexDirection: "column", justifyContent: "center", gap: 3}}>
                    <Input label="Nom" name="Nom" type="text" value={name} onChange={(e) => setName(e.target.value)}
                           errorText={errors.name}/>
                    <Input label="Email" name="Email" type="text" value={email}
                           onChange={(e) => setEmail(e.target.value)} errorText={errors.email}/>
                    <Input label="Mot de passe" name="password" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} errorText={errors.password}/>
                    <Input label="Confirmer Mot de passe" name="password" type="password" value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)} errorText={errors.confirmPassword}/>
                </Box>

                <Box sx={{mt: 5, display: "flex", alignItems: "center", gap: 0}}>
                    <BtnLogin label="Valider" type="button" onClick={handleRegister}/>
                </Box>

            </Box>
        </Box>
        </div>
    );
};

export default Register;
