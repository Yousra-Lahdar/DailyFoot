import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRef, useState } from "react";
import { usePlayers } from "../../../hooks/use-players.hook";
import CardPlayer from "../players/CardPlayer";
import AddPlayerCard from "../../pages/B-body/AddPlayerCard.tsx";
import AddPlayerDialog from "../../pages/B-body/AddPlayerDialog.tsx";
import axios from "axios";
import { BASE_API_URL } from "../../../constants.ts";

const PlayersCarouselAgenda = () => {
    const { players, loading, error, refetch } = usePlayers();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [openDialog, setOpenDialog] = useState(false);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    const scroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;
        const cardWidth = 200;
        const gap = 16;
        const scrollAmount = cardWidth + gap;

        carouselRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    const handleCreatePlayer = async (player:any) => {
        const token = localStorage.getItem("token");
        await axios.post(`${BASE_API_URL}/agent`, player, {
            headers: { Authorization: `Bearer ${token}` },
        });
        await refetch();
    };

    return (
        <>
            <Card sx={{ mb: 4, p: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mes Joueurs
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                        {players.length > 3 && (
                            <IconButton onClick={() => scroll("left")}>
                                <ArrowBack />
                            </IconButton>
                        )}

                        <Box
                            ref={carouselRef}
                            sx={{
                                display: "flex",
                                gap: 2,
                                overflowX: "auto",
                                flex: 1,
                                scrollBehavior: "smooth",
                                paddingBottom: 1,
                                justifyContent: players.length <= 3 ? "center" : "flex-start",
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                        >
                            {players.map((player) => (
                                <Box key={player.id} sx={{ flex: "0 0 auto", minWidth: 200 }}>
                                    <CardPlayer player={player} />
                                </Box>
                            ))}

                            {/* Ajouter la card seulement si aucun joueur */}
                            {players.length === 0 && (
                                <Box sx={{ flex: "0 0 auto", minWidth: 200 }}>
                                    <AddPlayerCard onClick={() => setOpenDialog(true)} />
                                </Box>
                            )}
                        </Box>

                        {players.length > 3 && (
                            <IconButton onClick={() => scroll("right")}>
                                <ArrowForward />
                            </IconButton>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <AddPlayerDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onCreate={handleCreatePlayer}
            />
        </>
    );
};

export default PlayersCarouselAgenda;
