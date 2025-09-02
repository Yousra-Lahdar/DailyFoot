import {Box, Typography} from "@mui/material";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import Imput from "../../components/compoLogin/Imput.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";

const ForgetPass = () => {

    const navigate = useNavigate();

    return (
    <Box sx={{ display: "flex", flexDirection: "column",
        justifyContent:"center",alignItems:"center",minHeight:"90vh" }}>

        <Typography
            variant="h5"
            sx={{fontWeight: "bold", color: "#c06e04",}}
        >
            Mot de passe oubliée
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

            <Box sx={{mt:6,display: "flex", alignItems: "center",gap: 4}}>
                <Imput label="Email" name="username"  type="text" />
            </Box>
            <Box sx={{mt:10, display: "flex", alignItems: "center",gap: 4}}>
                <BtnLogin label="Valider" type="button" onClick={() => navigate("/3/LoginAgent")} />
            </Box>
            <Box sx={{mt:6, display: "flex", alignItems: "center",gap: 4}}>
                <Button type="submit" onClick={() => navigate("/3/LoginAgent")} style={{color:"#f69a03"}} >Page de connection</Button>

            </Box>
        </Box>
    </Box>
    );
};

export default ForgetPass;
