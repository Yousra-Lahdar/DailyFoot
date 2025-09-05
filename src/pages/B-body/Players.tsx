import {Box, Stack, Typography} from "@mui/material";
import CardPlayer from "../../components/players/CardPlayer.tsx";
import { usePlayers } from "../../../hooks/use-players.hook.ts";

const Players = () => {
    const { players, loading, error } = usePlayers();

    if (loading) return <Typography>Chargement...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Stack sx={{ p: 4 }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 0fr))",
                    gap: 3,
                    justifyItems: "center",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {players.map(player => (
                    <CardPlayer key={player.name} player={player} />
                ))}
            </Box>
        </Stack>
    );
};

export default Players;
