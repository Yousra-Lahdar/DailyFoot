import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants";

interface Player {
    id: number;
    name: string;
    position: string;
    age: number;
    club: string;
    image: string;
    nationality: string;

}

export const usePlayers = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Utilisateur non authentifié");
            setLoading(false);
            return;
        }

        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/players/my-players`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPlayers(response.data);
            } catch (err: any) {
                console.error(err);
                setError("Impossible de récupérer les joueurs");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    return { players, loading, error };
};
