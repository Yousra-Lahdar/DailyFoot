import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";


const CardPlayer = () => {
    const navigate = useNavigate();

    const handleClick = () => {

        navigate(`/1/statistic`);
    };

    return (
        <Card
            sx={{
                width: 200,
                borderRadius: 3,
                boxShadow: 3,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
            }}
            onClick={handleClick}
        >
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <img
                    src=""
                    alt="photo de profil"
                    style={{ width: 120, height: 120}}
                />
            </Box>
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">nom</Typography>
                <Typography variant="body2">Pays:france </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button
                    size="small"
                    color="error"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    Supprimer
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardPlayer;
