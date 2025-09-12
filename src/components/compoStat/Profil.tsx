import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";

interface Player {
    name: string;
    age: number;
    nationality: string;
    club: string;
    poids: string;
    taille: string;
    image?: string;
}

interface ProfilProps {
    player?: Player;
    role?: "PLAYER" | "AGENT" | "ADMIN";
}

const Profil = ({ player,role }: ProfilProps) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    if (!player) return <p>Joueur introuvable</p>;

    return (
        <Card sx={{ width: 350, borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                    src={player.image || "/default-avatar.png"}
                    alt={player.name}
                    style={{ width: 100, height: 100, border: "3px solid orange", objectFit: "cover", borderRadius: "50%" }}
                />

                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {player.name}
                </Typography>
                <Typography variant="body2">{player.age} ans</Typography>
                <Typography variant="body2">{player.nationality}</Typography>
                <Typography variant="body2">{player.club}</Typography>

                <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="body2">{player.taille}</Typography>
                    <Typography variant="body2">{player.poids}</Typography>
                </Box>

                {role === "AGENT" && (
                    <Button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!id) {
                                console.error("ID dans l’URL est undefined");
                                return;
                            }
                            navigate(`/1/players/${id}/agenda`);
                        }}
                        sx={{ color: "#f69a03", mt: 1 }}
                    >
                        Son Agenda
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default Profil;
