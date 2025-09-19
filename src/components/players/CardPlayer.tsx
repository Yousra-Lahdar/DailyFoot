import {Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router";

interface Player {
    id: number;
    name: string;
    age: number;
    poste?: string;
    nationality: string;
    club: string;
    image?: string;
}

interface Props {
    player: Player;
}

const CardPlayer = ({player}: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!player.id) {
            console.error("Player ID is undefined", player);
            return;
        }
        navigate(`/agent/players/${player.id}/statistic`);
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                width: 200,
                cursor: "pointer",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
            }}
        >
            <CardContent>
                <img
                    src={player.image || "/default-avatar.png"}
                    alt={player.name}
                    style={{width: "30vw", height: "30vw", maxWidth:"150px", maxHeight:"150px", objectFit: "cover", borderRadius: "50%"}}
                />
                <Typography variant="subtitle1" sx={{mt: 1, fontWeight: "bold"}}>
                    {player.name}
                </Typography>
                <Typography variant="body2">{player.club}</Typography>
                <Typography variant="body2">Age : {player.age}</Typography>
                <Typography variant="body2">Poste : {player.poste}</Typography>
            </CardContent>
        </Card>
    );
};

export default CardPlayer;
