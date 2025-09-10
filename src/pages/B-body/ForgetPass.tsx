import {Box, Typography} from "@mui/material";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import Input from "../../components/compoLogin/Input.tsx";
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
            Mot de passe oublié
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
                <Input label="Email" name="username" type="text" />
            </Box>
            <Box sx={{mt:10, display: "flex", alignItems: "center",gap: 4}}>
                <BtnLogin label="Valider" type="button" onClick={() => navigate("/Login")} />
            </Box>
            <Box sx={{mt:6, display: "flex", alignItems: "center",gap: 4}}>
                <Button type="submit" onClick={() => navigate("/Login")} style={{color:"#f69a03"}} >Page de connexion</Button>

            </Box>
        </Box>
    </Box>
    );
};

export default ForgetPass;
