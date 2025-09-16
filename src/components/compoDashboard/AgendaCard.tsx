import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../constants";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function AgendaCard() {
    const [eventsToday, setEventsToday] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(`${BASE_API_URL}/agenda/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const now = new Date();

                const todayEvents = data
                    .filter((event: any) => {
                        const start = new Date(event.dateHeureDebut);
                        const oneHourLater = new Date(start.getTime() + 60 * 60 * 1000);
                        return oneHourLater > now; // garde seulement ceux encore valides
                    })
                    .sort((a: any, b: any) => new Date(a.dateHeureDebut).getTime() - new Date(b.dateHeureDebut).getTime())
                    .slice(0, 3); // maximum 3 événements

                setEventsToday(todayEvents);
            } catch (err) {
                console.error("Erreur lors du chargement des événements :", err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Événements aujourd’hui
            </Typography>

            {eventsToday.length > 0 ? (
                <Stack spacing={2}>
                    {eventsToday.map((e: any) => {
                        const start = new Date(e.dateHeureDebut);
                        const time = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                        const chipColor = e.type === "match" ? "primary" : "success";

                        return (
                            <Card key={e.id} variant="outlined">
                                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {e.title}
                                        </Typography>
                                        {e.description && (
                                            <Typography variant="body2" color="text.secondary">
                                                {e.description}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Stack direction="column" alignItems="flex-end" spacing={1}>
                                        <Typography variant="body2">{time}</Typography>
                                        {e.type && <Chip label={e.type} color={chipColor} size="small" />}
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Stack>
            ) : (
                <Typography color="text.secondary">Aucun événement à venir aujourd’hui</Typography>
            )}
        </Box>
    );
}
