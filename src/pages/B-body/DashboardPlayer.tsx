import {Box, Container, Typography} from "@mui/material";
import AgendaCard from "../../components/AgendaCard.tsx";
import TodoList from "../../components/TodoList.tsx";

const DashboardPlayer = () => {

    return (
        <Container maxWidth="xl" sx={{ mt: 8}}>
            <Box
                sx={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                }}
            >
                {/* Partie gauche */}
                <Box sx={{ flex: 2, minWidth: 300 }}>
                    <Typography
                        variant="h3"
                        sx={{ color: "orange", fontWeight: "bold", mb: 3, ml:30}}
                    >
                        BIENVENUE  FOREX
                    </Typography>

                    <AgendaCard />

                </Box>

                {/* Partie droite */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                    <TodoList />
                </Box>
            </Box>
        </Container>
    );
};

export default DashboardPlayer;
