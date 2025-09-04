import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const Profil = () => {
    const navigate = useNavigate();

    return (
        <Card sx={{ /*p:3, height:"100%", mt:-4 ,backgroundColor:"#ffffff",*/width: 350, borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="" alt="photo de profil" style={{width:100,height:100,border:"3px solid orange"}} />

                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    Alex Saran
                </Typography>
                <Typography variant="body2">20 ans</Typography>
                <Typography variant="body2">France</Typography>
                <Typography variant="body2">Real-Madrid</Typography>

                <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="body2">1.70 cm</Typography>
                    <Typography variant="body2">60 kg</Typography>

                </Box>
                <Button type="submit" onClick={() => navigate("/1/agenda")} sx={{color:"#f69a03"}} >Son Agenda</Button>
            </CardContent>
        </Card>
    );
};

export default Profil;
