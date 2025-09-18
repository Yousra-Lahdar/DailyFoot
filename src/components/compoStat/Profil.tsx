import {Box, Button, CardContent, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";

interface Player {
    name: string;
    age: number;
    nationality: string;
    club: string;
    weight: string;
    height: string;
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
            <CardContent sx={{p:0,  width:"100%" ,display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ bgcolor: "orange", py: 1, textAlign: "center" ,width:"100%",alignSelf: "stretch" }}>
                    <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Profil
                    </Typography>
                </Box>
                <img
                    src={player.image || "/default-avatar.png"}
                    alt={player.name}
                    style={{ marginTop:40,width: 250, height: 250, border: "3px solid orange", objectFit: "cover", borderRadius: "50%" }}
                />

                <Typography variant="h5" sx={{ mt:3,mb:3, fontWeight: "bold" }}>
                    {player.name}
                </Typography>
                <Typography variant="h6" >{player.age} ans</Typography>
                <Typography variant="h6" >{player.nationality}</Typography>
                <Typography variant="h6" >{player.club}</Typography>

                <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="h6">{/*player.height*/}50kg</Typography>
                    <Typography variant="h6">{player.weight}1.70cm</Typography>
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
                            navigate(`/agent/players/${id}/agenda`);
                        }}
                        sx={{ color: "#f69a03", mt: 1, fontSize:"1.5em" }}
                    >
                        Son Agenda
                    </Button>
                )}
            </CardContent>

    );
};

export default Profil;
