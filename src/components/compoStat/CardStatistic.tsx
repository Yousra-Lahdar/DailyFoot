import {Box, CardContent, Typography} from "@mui/material";
import {Radar} from "react-chartjs-2";
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Statistics {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
}

const CardStatistic = ({ stats }: { stats: Statistics }) => {
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
                backgroundColor: "rgba(255,165,0,0.53)",
                borderColor: "#f5672a",
                borderWidth: 2,
                pointBackgroundColor: "#f5672a",
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

            <CardContent  sx={{p:0,  width:"100%"}}>
                <Box sx={{   mb: 3, overflow: "hidden",display:"flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ bgcolor: "orange", py: 1, textAlign: "center",width:"100%" }}>
                        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                            Statistiques
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", flexWrap:"wrap"  }}>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center",gap:3,mt:5}}>
                            <Typography variant="h6">Buts : {stats.goals}</Typography>
                            <Typography variant="h6">Passes décisives :{stats.assists}</Typography>
                            <Typography variant="h6">Cartons jaunes :{stats.yellowCards}</Typography>
                            <Typography variant="h6">Cartons rouges :{stats.redCards}</Typography>
                            <Typography variant="h6">Matchs joués :{stats.matchesPlayed}</Typography>
                        </Box>

                        <Box sx={{ width: 550, height: 550 }}>
                            <Radar data={data} options={options} />
                        </Box>
                    </Box>
                </Box>
            </CardContent>

    );
};

export default CardStatistic;
