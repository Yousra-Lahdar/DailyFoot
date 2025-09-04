import { Box } from "@mui/material";
import CardPlayer from "../../components/players/CardPlayer.tsx";

const Players = () => {



    return (
        <Box sx={{ p: 4 }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 3,
                    justifyItems: "center",
                }}
            >
                    <CardPlayer/>
            </Box>

        </Box>
    );
};

export default Players;
