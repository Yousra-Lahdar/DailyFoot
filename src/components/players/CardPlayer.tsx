import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import type { PlayerDTO } from "../../../types/PlayerDTO";

interface CardPlayerProps {
    player: PlayerDTO;
}

const CardPlayer = ({ player }: CardPlayerProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/1/statistic`); // plus tard tu pourras passer player.id
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
                    src={player.image || "/default-avatar.png"}
                    alt={player.name}
                    style={{ width: 120, height: 120, borderRadius: "50%" }}
                />
            </Box>
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{player.name}</Typography>
                <Typography variant="body2">Poste: {player.poste}</Typography>
                <Typography variant="body2">Club: {player.club}</Typography>
                <Typography variant="body2">Pays: {player.nationality}</Typography>
                <Typography variant="body2">Âge: {player.age} ans</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button
                    size="small"
                    color="error"
                    onClick={(e) => {
                        e.stopPropagation();
                        // ajouter fonction de suppression plus tard
                    }}
                >
                    Supprimer
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardPlayer;
