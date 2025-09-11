import { Container, Typography, Box } from "@mui/material";
import AgendaCard from "../../components/compoDashboard/AgendaCard.tsx";
import PlayersCarouselAgenda from "../../components/compoDashboard/PlayersCarouselAgenda.tsx";
import TodoList from "../../components/compoDashboard/TodoList.tsx";
import axios from "axios";
import {useEffect, useState} from "react";


const DashboardAgent = () => {

    const [agentName, setAgentName] = useState<string>("");

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setAgentName(response.data.name);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAgent();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 8}}>
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
                        sx={{ color: "orange", fontWeight: "bold", mb: 3, ml:30}}
                    >
                        Bienvenue {agentName || "Chargement..."}
                    </Typography>

                    <AgendaCard />
                    <PlayersCarouselAgenda />
                </Box>


                <Box sx={{ flex: 1, minWidth: 250 }}>
                    <TodoList />
                </Box>
            </Box>
        </Container>
    );
};

export default DashboardAgent;

