import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Statistics {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
}

interface CardStatisticProps {
    stats: Statistics;
    onEdit?: () => void;
}

const CardStatistic = ({ stats, onEdit }: CardStatisticProps) => {
    const data = {
        labels: ["Buts", "Passes décisives", "Cartons jaunes", "Cartons rouges", "Matchs joués"],
        datasets: [
            {
                data: [
                    stats.goals,
                    stats.assists,
                    stats.yellowCards,
                    stats.redCards,
                    stats.matchesPlayed,
                ],
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                borderColor: "orange",
                borderWidth: 2,
                pointBackgroundColor: "orange",
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: { display: true },
                suggestedMin: 0,
                suggestedMax: Math.max(...data.datasets[0].data) + 5,
                pointLabels: { color: "black" },
            },
        },
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Card sx={{ width: 650, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ border: "1px solid orange", borderRadius: 2, mb: 3, overflow: "hidden" }}>
                    {/* Header */}
                    <Box sx={{ bgcolor: "orange", py: 1, textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                            Statistiques
                        </Typography>
                    </Box>

                    {/* Contenu */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, px: 2, pb: 2 }}>
                        {/* Colonne gauche avec stats + bouton en bas */}
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Box>
                                <Typography variant="body2">Buts : {stats.goals}</Typography>
                                <Typography variant="body2">Passes décisives : {stats.assists}</Typography>
                                <Typography variant="body2">Cartons jaunes : {stats.yellowCards}</Typography>
                                <Typography variant="body2">Cartons rouges : {stats.redCards}</Typography>
                                <Typography variant="body2">Matchs joués : {stats.matchesPlayed}</Typography>
                            </Box>

                            {onEdit && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 2, alignSelf: "flex-start" }}
                                    onClick={onEdit}
                                >
                                    Modifier les statistiques
                                </Button>
                            )}
                        </Box>

                        {/* Colonne droite avec le Radar chart */}
                        <Box sx={{ width: 350, height: 350 }}>
                            <Radar data={data} options={options} />
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardStatistic;

