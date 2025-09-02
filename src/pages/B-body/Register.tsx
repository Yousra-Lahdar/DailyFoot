import {Box, Button, Typography} from "@mui/material";
import Imput from "../../components/compoLogin/Imput.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import {useNavigate} from "react-router";

const Register = () => {

    const navigate = useNavigate();

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
                    <Imput label="Nom" name="username"  type="text" />
                    <Imput label="Email" name="username"  type="text" />
                    <Imput label="Mot-de-passe" name="username"  type="password" />
                    <Imput label="Confirmer Mot-de-passe" name="username"  type="password" />
                </Box>
                <Box sx={{mt:5, display: "flex", alignItems: "center",gap: 0}}>
                    <BtnLogin label="Valider" type="button" onClick={() => navigate("/3/LoginAgent")} />
                </Box>
                <Box sx={{mt:0, display: "flex", alignItems: "center",gap: 4}}>
                    <Button type="submit" onClick={() => navigate("/3/LoginAgent")} style={{color:"#f69a03"}} >Page de connection</Button>

                </Box>
            </Box>
        </Box>
    );
};

export default Register;
