import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import { Box, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, Button, DialogActions } from "@mui/material";
import { useParams } from "react-router";
import {addUserEvent, fetchUserAgendas} from "../../../api/user.api.ts";
type AgendaEvent = {
    id?: number;
    title: string;
    date: string;
    type?: string;         // pour FullCalendar
    description?: string;  // pour ton backend
};

const Agenda: React.FC = () => {
     const [events, setEvents] = useState<AgendaEvent[]>([
         { title: "Match vs PSG", date: "2025-09-10", type: "match" },
         { title: "Entraînement", date: "2025-09-12", type: "entrainement" },
     ]);

    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newType, setNewType] = useState("autre");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getEventColor = (type: string) => {
        switch (type) {
            case "match": return "red";
            case "entrainement": return "green";
            case "medical": return "blue";
            case "autre": return "orange";
            default: return "orange";
        }
    };

    const handleDateClick = (arg: DateClickArg) => {
        setSelectedDate(arg.dateStr);
        setNewTitle("");
        setNewType("autre");
        setOpen(true);
    };

    const handleAddEvent = async () => {
        const newEvent = {
            title: newTitle,
            description: newType, // ici tu peux mettre "match", "entrainement", "medical", "autre"
            dateHeureDebut: selectedDate + "T10:00:00", // ajouter l'heure si nécessaire
            dateHeureFin: selectedDate + "T12:00:00",
            ownerType: "AGENT", // ou "PLAYER" selon ton cas
        };

        try {
            const savedEvent = await addUserEvent(newEvent);
            // mettre à jour le state local pour que FullCalendar l’affiche
            setEvents([...events, {
                id: savedEvent.id,
                title: savedEvent.title,
                date: savedEvent.dateHeureDebut.split("T")[0],
                type: savedEvent.description, // ici on garde type pour color
                description: savedEvent.description || "",
            }]);
            setOpen(false);
        } catch (err) {
            console.error("Erreur lors de l’ajout :", err);
        }
    };



    const handleEventClick = (arg: EventClickArg) => {
        if (confirm(`Supprimer l'événement "${arg.event.title}" ?`)) {
            arg.event.remove();
        }
    };
    useEffect(() => {
        const loadAgenda = async () => {
            try {
                const data = await fetchUserAgendas();
                setEvents(data);
            } catch (err: any) {
                setError(err.message || "Erreur lors du chargement de l’agenda");
            } finally {
                setLoading(false);
            }
        };

        loadAgenda();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if(error) return <p style={{ color: "red" }}>{error}</p>;
    return (
        <Box sx={{ p: 3 }}>
            <h2>Agenda {id}</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events.map((event) => ({
                    ...event,
                    type: event.description,
                    color: getEventColor(event.description),
                }))}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="80vh"
            />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <span style={{ background: "red", padding: "4px 8px", borderRadius: "4px", color: "white" }}>
                    Match
                  </span>
                <span style={{ background: "green", padding: "4px 8px", borderRadius: "4px", color: "white" }}>
                    Entraînement
                  </span>
                <span style={{ background: "blue", padding: "4px 8px", borderRadius: "4px", color: "white" }}>
                    RDV Médical
                  </span>
                <span style={{ background: "orange", padding: "4px 8px", borderRadius: "4px", color: "white" }}>
                    Autre RDV
                  </span>
            </Box>


            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Ajouter un événement</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Titre"
                        fullWidth
                        margin="normal"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Select
                        value={newType}
                        fullWidth
                        onChange={(e) => setNewType(e.target.value)}
                    >
                        <MenuItem value="match">Match</MenuItem>
                        <MenuItem value="entrainement">Entraînement</MenuItem>
                        <MenuItem value="medical">RDV Médical</MenuItem>
                        <MenuItem value="autre">Autre</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleAddEvent} variant="contained">Ajouter</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Agenda;
