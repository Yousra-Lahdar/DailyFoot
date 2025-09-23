import {Box, CardContent, Typography} from "@mui/material";
import {Radar} from "react-chartjs-2";
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
import type {StatisticsWithoutHeightAndWeight} from "../../../types/Statistics.ts";

const CardStatistic = ({ stats }: { stats: StatisticsWithoutHeightAndWeight }) => {
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
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center",alignItems:"center",flexWrap:{ xs: "wrap", md: "nowrap" },gap:{ xs: 1, md: 2},mt:5,textAlign:"center"}}>
                            <Typography sx={{fontSize: { xs: "0.9rem", md: "1.5rem" }}}>Buts: {stats.goals}</Typography>
                            <Typography sx={{fontSize: { xs: "0.9rem", md: "1.5rem" }}}>Passes décisives: {stats.assists}</Typography>
                            <Typography sx={{fontSize: { xs: "0.9rem", md: "1.5rem" }}}>Cartons jaunes: {stats.yellowCards}</Typography>
                            <Typography sx={{fontSize: { xs: "0.9rem", md: "1.5rem" }}}>Cartons rouges: {stats.redCards}</Typography>
                            <Typography sx={{fontSize: { xs: "0.9rem", md: "1.5rem" }}}>Matchs joués: {stats.matchesPlayed}</Typography>
                        </Box>

                        <Box sx={{ width:{md:550,xs:430}, height:{md:550,xs:430} }}>
                            <Radar data={data} options={options} />
                        </Box>
                    </Box>
                </Box>
            </CardContent>

    );
};

export default CardStatistic;
