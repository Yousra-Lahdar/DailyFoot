import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRef } from "react";
import { usePlayers } from "../../../hooks/use-players.hook";
import CardPlayer from "../players/CardPlayer";

const PlayersCarouselAgenda = () => {
    const { players, loading, error } = usePlayers();
    const carouselRef = useRef<HTMLDivElement>(null);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    const scroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;

        // Largeur d'une carte + gap (ajuster gap si modifié dans sx)
        const cardWidth = 200; // largeur de CardPlayer
        const gap = 16; // gap entre les cartes en px
        const scrollAmount = cardWidth + gap;

        carouselRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <Card sx={{ mb: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Mes Joueurs
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                    {/* Flèche gauche */}
                    <IconButton onClick={() => scroll("left")}>
                        <ArrowBack />
                    </IconButton>

                    {/* Joueurs */}
                    <Box
                        ref={carouselRef}
                        sx={{
                            display: "flex",
                            gap: 2,
                            overflowX: "auto",
                            flex: 1,
                            scrollBehavior: "smooth",
                            paddingBottom: 1,
                            "&::-webkit-scrollbar": { display: "none" }, // cache la scrollbar
                        }}
                    >
                        {players.map((player) => (
                            <Box key={player.id} sx={{ flex: "0 0 auto" }}>
                                <CardPlayer player={player} />
                            </Box>
                        ))}
                    </Box>

                    {/* Flèche droite */}
                    <IconButton onClick={() => scroll("right")}>
                        <ArrowForward />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PlayersCarouselAgenda;
