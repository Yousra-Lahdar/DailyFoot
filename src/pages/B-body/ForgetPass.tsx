import {Box, Typography} from "@mui/material";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import Input from "../../components/compoLogin/Input.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";

const ForgetPass = () => {

    const navigate = useNavigate();

    return (
    <div style={{
        background: "linear-gradient(16deg, rgba(192, 110, 4, 1) 23%, rgba(246, 154, 3, 1) 48%, rgba(255, 244, 158, 1) 72%, rgba(255, 224, 178, 1) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex", alignItems:"center",justifyContent:"center",flexDirection:"column"
    }}>
    <Box sx={{ display: "flex", flexDirection: "column",
        justifyContent:"center",alignItems:"center",minHeight:"90vh" }}>

        <Typography
            variant="h5"
            sx={{fontWeight: "bold", color: "#c06e04",mb:2}}
        >
            Mot de passe oublié
        </Typography>

        <Box
            sx={{
                width: 512,
                height: 390,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
                pt: 4,
                boxShadow:2,

            }}
        >
            <img
                src="/logo-dailyfoot.png"
                alt="Logo DailyFoot"
                style={{ width: 120, borderRadius: 70 }}
                onClick={() => navigate("/Login")}
            />

            <Box sx={{mt:7,display: "flex", alignItems: "center",gap: 4}}>
                <Input label="Email" name="username" type="text" />
            </Box>
            <Box sx={{mt:1, display: "flex", alignItems: "center",gap: 4}}>
                <BtnLogin label="Valider" type="button" onClick={() => navigate("/Login")} />
            </Box>
        </Box>
    </Box>
    </div>
    );
};

export default ForgetPass;
