
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Profil from "../../components/compoStat/Profil";
import CardStatistic from "../../components/compoStat/CardStatistic";
import { BASE_API_URL } from "../../../constants.ts";
import {useParams} from "react-router";


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
    const [stats, setStats] = useState<PlayerStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Récupérer le rôle depuis le token
    let role: "PLAYER" | "AGENT" | "ADMIN" | undefined;
    const token = localStorage.getItem("token");
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        role = decodedPayload.role;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError("You must be logged in.");
                setLoading(false);
                return;
            }

            try {
                let playerId: number | undefined = id ? Number(id) : undefined;

                if (!playerId) {
                    const meResponse = await axios.get(`${BASE_API_URL}/players/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    playerId = meResponse.data.id;
                }

                const statsResponse = await axios.get(`${BASE_API_URL}/statistic/player/${playerId}`, {

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
    

    useEffect(() => {
        fetchData();
    }, [id, token]);

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

    const handleOpenDialog = () => {
        setEditStats(stats.statistics); // remplir avec les stats actuelles
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);
    
    const handleSave = async () => {
        if (!editStats) return;
        
        const token = localStorage.getItem("token");
        try {
            await axios.patch(
                `${BASE_API_URL}/statistic/update/${currentPlayer.id}`,
                editStats,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            await fetchData();

            setOpenDialog(false);
        } catch (err) {
            console.error("Erreur lors de la mise à jour des stats", err);
            alert("Erreur lors de la mise à jour des statistiques.");
        }
    };

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
     <CardStatistic stats={stats.statistics} />

            <Profil player={currentPlayer} role={role} />
            <Box>
                <CardStatistic stats={openDialog && editStats ? editStats : stats.statistics} />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleOpenDialog}
                >
                    Modifier les statistiques
                </Button>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Modifier les statistiques</DialogTitle>
                <DialogContent>
                    {editStats && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                            <TextField
                                label="Buts"
                                type="number"
                                value={editStats.goals}
                                onChange={(e) => setEditStats({ ...editStats, goals: Number(e.target.value) })}
                            />
                            <TextField
                                label="Passes décisives"
                                type="number"
                                value={editStats.assists}
                                onChange={(e) => setEditStats({ ...editStats, assists: Number(e.target.value) })}
                            />
                            <TextField
                                label="Cartons jaunes"
                                type="number"
                                value={editStats.yellowCards}
                                onChange={(e) => setEditStats({ ...editStats, yellowCards: Number(e.target.value) })}
                            />
                            <TextField
                                label="Cartons rouges"
                                type="number"
                                value={editStats.redCards}
                                onChange={(e) => setEditStats({ ...editStats, redCards: Number(e.target.value) })}
                            />
                            <TextField
                                label="Matchs joués"
                                type="number"
                                value={editStats.matchesPlayed}
                                onChange={(e) => setEditStats({ ...editStats, matchesPlayed: Number(e.target.value) })}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleSave} variant="contained" color="success">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Statistic;
