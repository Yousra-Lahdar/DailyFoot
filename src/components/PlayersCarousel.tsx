import { Card, CardContent, Typography, IconButton, Avatar, Divider, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const players = [
    { id: 1, name: "Alex Saran", img: "/avatar1.png" },
    { id: 2, name: "Alex Saran", img: "/avatar2.png" },
    { id: 3, name: "Alex Saran", img: "/avatar3.png" }
];

const PlayersCarousel = () => {
    return (
        <Card sx={{ mb: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Date
                </Typography>
                <Typography variant="body2" gutterBottom>
                    08/08/2025
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    {/* Flèche gauche */}
                    <IconButton>
                        <ArrowBack />
                    </IconButton>

                    {/* Joueurs */}
                    <Box sx={{ display: "flex", gap: 2, flex: 1, justifyContent: "center", flexWrap: "wrap" }}>
                        {players.map((player) => (
                            <Card key={player.id} sx={{ textAlign: "center", p: 2, minWidth: 150 }}>
                                <Avatar src={player.img} alt={player.name} sx={{ width: 80, height: 80, mx: "auto" }} />
                                <Typography variant="subtitle1" mt={1}>
                                    {player.name}
                                </Typography>

                                {/* Lignes de dispo */}
                                <Divider sx={{ bgcolor: "green", height: 6, borderRadius: 2, mt: 1 }} />
                                <Divider sx={{ bgcolor: "red", height: 6, borderRadius: 2, mt: 1 }} />
                                <Divider sx={{ bgcolor: "purple", height: 6, borderRadius: 2, mt: 1 }} />
                            </Card>
                        ))}
                    </Box>

                    {/* Flèche droite */}
                    <IconButton>
                        <ArrowForward />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PlayersCarousel;
