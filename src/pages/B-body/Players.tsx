import {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import CardPlayer from "../../components/players/CardPlayer.tsx";
import AddPlayerCard from "../../components/players/AddPlayerCard.tsx";
import AddPlayerDialog from "../../components/players/AddPlayerDialog.tsx";
import {usePlayers} from "../../../hooks/use-players.hook.ts";
import axios from "axios";
import {BASE_API_URL} from "../../../constants.ts";
import {toast} from "react-toastify";
import Pages from "../../components/layout/Pages.tsx";

const Players = () => {
    const {players, loading, error, refetch} = usePlayers();
    const [openDialog, setOpenDialog] = useState(false);

    const handleCreatePlayer = async (player: any) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${BASE_API_URL}/agent`, player, {
                headers: {Authorization: `Bearer ${token}`},
            });
            await refetch();
            toast.success(`Le joueur ${player.name} à bien été ajouté.`);
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de l’ajout du joueur.");
        }
    };

    const handleDeletePlayer = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce joueur ?")) return;

    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BASE_API_URL}/players/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Joueur supprimé !");
        await refetch();
    } catch (err) {
        console.error(err);
        toast.error("Erreur lors de la suppression du joueur.");
    }
};

const [editingPlayer, setEditingPlayer] = useState<any | null>(null);

const handleEditPlayer = (player: any) => {
    setEditingPlayer(player);
    setOpenDialog(true);
};

const handleUpdatePlayer = async (updatedPlayer: any) => {
    console.log("PUT payload:", updatedPlayer);
    try {
        const token = localStorage.getItem("token");
        await axios.put(`${BASE_API_URL}/players/${updatedPlayer.id}`, updatedPlayer, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`Le joueur ${updatedPlayer.name} a été mis à jour.`);
        setEditingPlayer(null);
        setOpenDialog(false);
        await refetch();
    } catch (err) {
        console.error(err);
        toast.error("Erreur lors de la mise à jour du joueur.");
    }
};


    if (loading) return <Typography>Chargement...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Pages title="les joueurs">
            <Stack sx={{p: 4}}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:{
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                        justifyItems: "center",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {players.map((player) => (
                        <CardPlayer key={player.id} player={player} onEdit={handleEditPlayer} onDelete={handleDeletePlayer}/>
                    ))}

                    <AddPlayerCard onClick={() => {
                        setEditingPlayer(null);
                        setOpenDialog(true);
                    }}
                    />
                </Box>

                <AddPlayerDialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false);
                        setEditingPlayer(null);
                    }}
                    onCreate={handleCreatePlayer}
                    playerToEdit={editingPlayer}
                    onUpdate={handleUpdatePlayer}
                />
            </Stack>
        </Pages>
    );
};

export default Players;
