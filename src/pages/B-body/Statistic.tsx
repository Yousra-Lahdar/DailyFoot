import {Box, Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import Profil from "../../components/compoStat/Profil";
import CardStatistic from "../../components/compoStat/CardStatistic";
import {BASE_API_URL} from "../../../constants.ts";


interface Player {
    id: number;
    name: string;
    age: number;
    nationality: string;
    club: string;
    height: string;
    weight: string;
    photoUrl?: string;
}

interface Statistics {
    buts: number;
    passesDecisives: number;
    cartonsJaunes: number;
    cartonsRouges: number;
    matchsJoues: number;
    taille: number;
    poids: number;
}

interface Match {
    id: number;
    date: string;
    opponent: string;
    score: string;
}

interface PlayerStatistics {
    player: Player;
    statistics: Statistics;
    matches?: Match[];
}

const Statistic = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [stats, setStats] = useState<PlayerStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Vous devez être connecté.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${BASE_API_URL}/statistique/player/${id}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setStats(response.data);
            } catch (err: any) {
                console.error(err);
                setError("Statistiques du joueur non trouvées ou accès interdit.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <Typography sx={{mt: 4, textAlign: "center"}}>Chargement...</Typography>;
    if (error) return <Typography sx={{mt: 4, textAlign: "center", color: "red"}}>{error}</Typography>;
    if (!stats) return <Typography sx={{mt: 4, textAlign: "center"}}>Profil du joueur non disponible</Typography>;

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
            <Profil player={stats.player}/>

            <CardStatistic stats={stats.statistics}/>
            <Button
                variant="outlined"
                sx={{mt: 2}}
                onClick={() => navigate("/1/players")} // adapte selon ton routeur
            >
                Retour à la liste des joueurs
            </Button>
        </Box>
    );
};

export default Statistic;
