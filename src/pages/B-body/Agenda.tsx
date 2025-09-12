import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import { Box, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, Button, DialogActions } from "@mui/material";
import { useParams } from "react-router";
import {addUserEvent, deleteUserEvent, fetchUserAgendas} from "../../../api/user.api.ts";
type AgendaEvent = {
    id: string;
    title: string;
    start: string;
    end: string;
    type?: string;
    description?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
};

const Agenda: React.FC = () => {
     const [events, setEvents] = useState<AgendaEvent[]>([]);

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
        setSelectedDate(arg.date.toISOString()); // ISO complet avec heure
        setNewTitle("");
        setNewType("autre");
        setOpen(true);
    };


    const handleAddEvent = async () => {
        const start = new Date(selectedDate); // ISO complet avec heure
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2h

        const newEvent = {
            title: newTitle,
            description: newType,
            dateHeureDebut: start.toISOString(),
            dateHeureFin: end.toISOString(),
            ownerType: "AGENT",
        };

        try {
            const savedEvent = await addUserEvent(newEvent);
            setEvents([...events, {
                id: savedEvent.id,
                title: savedEvent.title,
                start: savedEvent.dateHeureDebut,
                end: savedEvent.dateHeureFin,
                type: savedEvent.description,
                description: savedEvent.description || "",
                backgroundColor: getEventColor(savedEvent.description),
                borderColor: getEventColor(savedEvent.description),
                textColor: 'white'
            }]);
            setOpen(false);
        } catch (err) {
            console.error("Erreur lors de l’ajout :", err);
        }
    };

    const handleEventClick = async (arg: EventClickArg) => {
        if (confirm(`Supprimer l'événement "${arg.event.title}" ?`)) {
            try {
                // 1️⃣ Appel API pour supprimer l'événement en base
                await deleteUserEvent(arg.event.id); // tu dois créer cette fonction dans user.api.ts

                // 2️⃣ Supprime l'événement du state local
                setEvents(prevEvents => prevEvents.filter(e => e.id !== arg.event.id));

                // 3️⃣ Supprime l'événement du calendrier (optionnel, FullCalendar se met à jour automatiquement)
                arg.event.remove();
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
                alert("Impossible de supprimer l'événement en base");
            }
        }
    };

    useEffect(() => {
        const loadAgenda = async () => {
            setLoading(true);
            try {
                const data = await fetchUserAgendas();
                if (!data) return setEvents([]);

                const formattedEvents = data.map(ev => ({
                    id: ev.id.toString(),
                    title: ev.title,
                    start: ev.dateHeureDebut, // FullCalendar lit "start"
                    end: ev.dateHeureFin,     // FullCalendar lit "end"
                    description: ev.description || "",
                    type: ev.description || "autre",
                    backgroundColor: getEventColor(ev.description || "autre"),
                    borderColor: getEventColor(ev.description || "autre"),
                    textColor: 'white'
                }));

                setEvents(formattedEvents);
            } catch (err: any) {
                setError(err.message || "Erreur lors du chargement de l’agenda");
                setEvents([]);
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
                events={events}
                eventContent={(arg) => {
                    // Custom rendering pour forcer un rectangle
                    return (
                        <div style={{
                            backgroundColor: arg.event.backgroundColor,
                            border: `1px solid ${arg.event.borderColor}`,
                            color: arg.event.textColor,
                            padding: "2px 4px",
                            borderRadius: "4px",
                            fontSize: "0.85em",
                        }}>
                            {arg.event.title}
                        </div>
                    );
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="80vh"
                displayEventTime={false}
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
