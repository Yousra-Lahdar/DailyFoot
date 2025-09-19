import {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import CardPlayer from "../../components/players/CardPlayer.tsx";
import AddPlayerCard from "./AddPlayerCard.tsx";
import AddPlayerDialog from "./AddPlayerDialog.tsx";
import {usePlayers} from "../../../hooks/use-players.hook.ts";
import axios from "axios";
import {BASE_API_URL} from "../../../constants.ts";
import {toast} from "react-toastify";

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

    if (loading) return <Typography>Chargement...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
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
                    <CardPlayer key={player.id} player={player}/>
                ))}

                <AddPlayerCard onClick={() => setOpenDialog(true)}/>
            </Box>

            <AddPlayerDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onCreate={handleCreatePlayer}
            />
        </Stack>
    );
};

export default Players;
