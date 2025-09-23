import {Box, Container, Typography} from "@mui/material";
import AgendaCard from "../../components/compoDashboard/AgendaCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import FootSiteCard from "../../components/compoDashboard/FootSiteCard.tsx";
import CardStatistic from "../../components/compoStat/CardStatistic.tsx";
import {BASE_API_URL} from "../../../constants.ts";
import type {PlayerStatistics} from "../../../types/Statistics.ts";
import Pages from "../../components/layout/Pages.tsx";

const DashboardPlayer = () => {
    const [playerName, setPlayerName] = useState<string>("");
    const [stats, setStats] = useState<PlayerStatistics | null>(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/players/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setPlayerName(response.data.name);

                // Récupérer aussi ses stats
                const statsResponse = await axios.get(`${BASE_API_URL}/statistic/player/${response.data.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setStats(statsResponse.data);

                if (localStorage.getItem("justLoggedIn") === "true") {
                    toast.success(`Bienvenue ${response.data.name} !`);
                    localStorage.removeItem("justLoggedIn");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayer();
    }, []);

    return (
        <Pages title="accueil joueur">
            <Container maxWidth="xl" sx={{ mt: 8 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{ flex: 2, minWidth: 300 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "orange",
                                fontSize: { xs: "1.25rem", md: "2rem" },
                                fontWeight: "bold",
                                display:"flex",
                                justifyContent: "center",
                                mb:3
                            }}
                        >
                            BIENVENUE {playerName || "Chargement..."}
                        </Typography>

                        <AgendaCard />

                        {stats &&  <CardStatistic stats={stats.statistics} />}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 250 }}>
                        <FootSiteCard />
                    </Box>
                </Box>
            </Container>
        </Pages>
    );
};

export default DashboardPlayer;
