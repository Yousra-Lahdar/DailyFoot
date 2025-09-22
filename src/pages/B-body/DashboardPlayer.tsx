import {Box, Container, Typography} from "@mui/material";
import AgendaCard from "../../components/compoDashboard/AgendaCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import FootSiteCard from "../../components/compoDashboard/FootSiteCard.tsx";

const DashboardPlayer = () => {

    const [playerName, setPlayerName] = useState<string>("");

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setPlayerName(response.data.name);
                if (localStorage.getItem("justLoggedIn") === "true") {
                    toast.success(`Bienvenue ${response.data.name} !`);
                    localStorage.removeItem("justLoggedIn");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayer();
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
                        sx={{color: "orange", fontSize: { xs: "1.25rem", md: "2rem" } ,fontWeight: "bold", display:"flex", justifyContent: "center",mb:3}}
                    >
                        BIENVENUE {playerName || "Chargement..."}
                    </Typography>

                    <AgendaCard />

                </Box>


                <Box sx={{ flex: 1, minWidth: 250 }}>
                    <FootSiteCard/>
                </Box>
            </Box>
        </Container>
    );
};

export default DashboardPlayer;
