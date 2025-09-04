import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const CardStatistic = () => {
    return (
        <Card sx={{ width: 650, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                {/* Bloc du haut : Titre + Stats + Graph */}
                <Box
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        mb: 3,
                        overflow: "hidden",
                    }}
                >
                    {/* Header orange */}
                    <Box
                        sx={{
                            bgcolor: "orange",
                            py: 1,
                            textAlign: "center",
                            position: "relative",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            Statistiques
                        </Typography>
                    </Box>

                    {/* Bouton Modifier sous le header */}
                    <Box sx={{ textAlign: "right", pr: 2, mt: 1 }}>
                        <Button
                            size="small"
                            sx={{
                                textTransform: "none",
                                fontSize: "0.8rem",
                                color: "gray",
                                "&:hover": { bgcolor: "#f0f0f0" },
                            }}
                        >
                            Modifier
                        </Button>
                    </Box>

                    {/* Stats + Graph côte à côte */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 2,
                            px: 2,
                            pb: 2,
                        }}
                    >
                        {/* Stats list */}
                        <Box>
                            <Typography variant="body2">But(s) : 8</Typography>
                            <Typography variant="body2">Passe(s) décisive(s) : 8</Typography>
                            <Typography variant="body2">Carton(s) jaune(s) : 3</Typography>
                            <Typography variant="body2">Carton(s) rouge(s) : 1</Typography>
                            <Typography variant="body2">Matchs joués : 30</Typography>
                            <Typography variant="body2">Meilleur ELO : 37 (+1)</Typography>
                        </Box>

                        {/* Graph Radar placeholder */}
                        <Box
                            sx={{
                                width: 200,
                                height: 200,
                                bgcolor: "#f5f5f5",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "gray",
                            }}
                        >
                            Graph ici
                        </Box>
                    </Box>
                </Box>

                {/* Bloc du bas : Terrain */}
                <Box
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 400,
                            height: 200,
                            bgcolor: "green",
                            borderRadius: 2,
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "orange",
                                borderRadius: "50%",
                                position: "absolute",
                                top: "40%",
                                left: "20%",
                            }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardStatistic;
