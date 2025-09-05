import { Card, CardContent, Typography, Box } from "@mui/material";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Statistics {
    buts: number;
    passesDecisives: number;
    cartonsJaunes: number;
    cartonsRouges: number;
    matchsJoues: number;
}

const CardStatistic = ({ stats }: { stats: Statistics }) => {
    const data = {
        labels: ["Buts", "Passes décisives", "Cartons jaunes", "Cartons rouges", "Matchs joués"],
        datasets: [
            {
                data: [
                    stats.buts,
                    stats.passesDecisives,
                    stats.cartonsJaunes,
                    stats.cartonsRouges,
                    stats.matchsJoues,
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
                    <Box sx={{ bgcolor: "orange", py: 1, textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                            Statistiques
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, px: 2, pb: 2 }}>
                        <Box>
                            <Typography variant="body2">Buts : {stats.buts}</Typography>
                            <Typography variant="body2">Passes décisives : {stats.passesDecisives}</Typography>
                            <Typography variant="body2">Cartons jaunes : {stats.cartonsJaunes}</Typography>
                            <Typography variant="body2">Cartons rouges : {stats.cartonsRouges}</Typography>
                            <Typography variant="body2">Matchs joués : {stats.matchsJoues}</Typography>
                        </Box>

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
