import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Radar } from "react-chartjs-2";
import {Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend} from "chart.js";


ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CardStatistic = () => {

    const data = {
        labels: ["But(s)","Passe(s)décisive(s)","Carton(s) jaune(s)","Carton(s) rouge(s)","Matchs joués"],
        datasets: [
            {

                data: [65, 59, 90, 81, 56,],
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
                suggestedMax: 100,
                pointLabels: {
                    color: "black",
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Card sx={{ width: 650, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>

                <Box
                    sx={{
                        border: "1px solid orange",
                        borderRadius: 2,
                        mb: 3,
                        overflow: "hidden",
                    }}
                >

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

                        <Box>
                            <Typography variant="body2">But(s) : 8</Typography>
                            <Typography variant="body2">Passe(s) décisive(s) : 8</Typography>
                            <Typography variant="body2">Carton(s) jaune(s) : 3</Typography>
                            <Typography variant="body2">Carton(s) rouge(s) : 1</Typography>
                            <Typography variant="body2">Matchs joués : 30</Typography>

                        </Box>


                        <Box sx={{ width: 350, height: 350 }}>
                            <Radar data={data} options={options} />
                        </Box>
                    </Box>
                </Box>


                <Box
                    sx={{
                        border: "1px solid orange",
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
