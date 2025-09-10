import {Box, Button, Typography} from "@mui/material";
import Input from "../../components/compoLogin/Input.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import {useNavigate} from "react-router";

const ContactUs = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", flexDirection: "column",
            justifyContent:"center",alignItems:"center",minHeight:"90vh" }}>

            <Typography
                variant="h5"
                sx={{fontWeight: "bold", color: "#c06e04",}}
            >
                Contacter Nous
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

                <Box sx={{mt:6,display: "flex", flexDirection:"column" ,alignItems: "center",gap:4}}>
                    <Input label="Nom" name="username" type="text" />
                    <Input label="Prenom" name="username" type="text" />
                    <Input label="Email" name="username" type="text" />
                    <Input label="Message" name="username" type="text" />
                </Box>
                <Box sx={{mt:5, display: "flex", alignItems: "center",gap:1}}>
                    <BtnLogin label="Valider" type="button" onClick={() => navigate("/3")} />
                </Box>
                <Box sx={{mt:0, display: "flex", alignItems: "center",gap:1}}>
                    <Button type="submit" onClick={() => navigate("/3/LoginAgent")} style={{color:"#f69a03"}} >Page de connection</Button>

                </Box>
            </Box>
        </Box>
    );
};

export default ContactUs;
