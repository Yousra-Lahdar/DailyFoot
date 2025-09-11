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
        navigate(`/1/players/${player.id}/statistic`);
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
                    style={{width: "100%", height: 120, objectFit: "cover", borderRadius: "10%"}}
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
