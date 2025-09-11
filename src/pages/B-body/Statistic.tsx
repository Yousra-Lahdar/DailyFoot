import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Profil from "../../components/compoStat/Profil";
import CardStatistic from "../../components/compoStat/CardStatistic";
import { BASE_API_URL } from "../../../constants.ts";

interface Player {
    id: number;
    name: string;
    age: number;
    nationality: string;
    club: string;
    height: string;
    weight: string;
    image?: string;
}

interface Statistics {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
    height: number;
    weight: number;
}

interface Match {
    id: number;
    date: string;
    opponent: string;
    score: string;
}

interface PlayerStatistics {
    player: Player | Player[];
    statistics: Statistics;
    matches?: Match[];
}

const Statistic = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [stats, setStats] = useState<PlayerStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in.");
                setLoading(false);
                return;
            }

            try {
                let playerId: number | undefined = id ? Number(id) : undefined;

                // If no id in URL (player interface), fetch the current player
                if (!playerId) {
                    const meResponse = await axios.get(`${BASE_API_URL}/players/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    playerId = meResponse.data.id;
                }

                // Fetch statistics for the player
                const statsResponse = await axios.get(`${BASE_API_URL}/statistic/player/${playerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setStats(statsResponse.data);
            } catch (err: any) {
                console.error(err);
                setError("Player statistics not found or access denied.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading)
        return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;
    if (error)
        return (
            <Typography sx={{ mt: 4, textAlign: "center", color: "red" }}>
                {error}
            </Typography>
        );
    if (!stats)
        return (
            <Typography sx={{ mt: 4, textAlign: "center" }}>
                Player profile not available
            </Typography>
        );

    // Handle the case where stats.player is an array
    const currentPlayer = Array.isArray(stats.player)
        ? stats.player.find((p) => p.id === Number(id))
        : stats.player;

    if (!currentPlayer) {
        return (
            <Typography sx={{ mt: 4, textAlign: "center", color: "red" }}>
                Player not found
            </Typography>
        );
    }

    console.log("Current player to pass to Profil:", currentPlayer);

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                p: 2,
                justifyContent: "center",
                mt: 2,
            }}
        >
            <Profil player={currentPlayer} />
            <CardStatistic stats={stats.statistics} />
        </Box>
    );
};

export default Statistic;
