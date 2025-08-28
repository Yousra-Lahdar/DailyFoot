import {Box, Button, Typography} from "@mui/material";
import Imput from "../../components/Imput.tsx";
import BtnLogin from "../../components/BtnLogin.tsx";

const Register = () => {

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

                <Box sx={{mt:6,display: "flex", flexWrap:"wrap",justifyContent:"center",gap: 4}}>
                    <Imput label="Nom" name="username"  type="text" />
                    <Imput label="Email" name="username"  type="text" />
                    <Imput label="Mot-de-passe" name="username"  type="password" />
                    <Imput label="Mot-de-passe" name="username"  type="password" />
                </Box>
                <Box sx={{mt:10, display: "flex", alignItems: "center",gap: 4}}>
                    <BtnLogin label="Valider" type="button" />
                </Box>
                <Box sx={{mt:6, display: "flex", alignItems: "center",gap: 4}}>
                    <Button type="submit" style={{color:"#f69a03"}} >Page de connection</Button>

                </Box>
            </Box>
        </Box>
    );
};

export default Register;
