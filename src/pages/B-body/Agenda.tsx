import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import type {DateClickArg} from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import type {EventClickArg} from "@fullcalendar/core";
import frLocale from "@fullcalendar/core/locales/fr";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useParams} from "react-router";
import {addUserEvent, deleteUserEvent, fetchPlayerAgenda, fetchUserAgendas} from "../../../api/user.api.ts";
import ConfirmDialog from "../../components/compoDashboard/ConfirmDialog.tsx";
import {toast} from "react-toastify";
import type {AgendaEvent, AgendaEventFormatted} from "../../../types/AgendaEvent.ts";
import {addEventForPlayer, deletePlayerEvent} from "../../../api/agenda.api.ts";
import Pages from "../../components/layout/Pages.tsx";


const Agenda: React.FC = () => {
    const [events, setEvents] = useState<AgendaEvent[]>([]);

    const {id} = useParams<{ id: string }>();
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [newTitle, setNewTitle] = useState("");
    const [newType, setNewType] = useState("autre");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(null);

    const [headerToolbar, setHeaderToolbar] = useState({
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay"
    });

    const getEventColor = (type: string) => {
        switch (type) {
            case "match":
                return "red";
            case "entrainement":
                return "green";
            case "medical":
                return "blue";
            case "autre":
                return "orange";
            default:
                return "orange";
        }
    };

    const handleDateClick = (arg: DateClickArg) => {
        setSelectedDate(arg.date);
        setNewTitle("");
        setNewType("autre");
        setOpen(true);
    };


    const handleAddEvent = async () => {
        const formatDateLocal = (d: Date) => {
            const pad = (n: number) => n.toString().padStart(2, "0");
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
        };
        const start = selectedDate!
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        console.log(new Date(), selectedDate);
        const newEvent = {
            title: newTitle,
            description: newType,
            dateHeureDebut: formatDateLocal(start),
            dateHeureFin: formatDateLocal(end),
            ownerType: id ? "PLAYER" : "AGENT", // qui crée l'événement
        };

        try {
            let savedEvent;
            if (id) {
                // On ajoute l'event sur l'agenda du joueur
                savedEvent = await addEventForPlayer(id, newEvent);
            } else {
                // On ajoute l'event sur son propre agenda (agent)
                savedEvent = await addUserEvent(newEvent);
            }

            setEvents(prev => [...prev, {
                id: savedEvent.id.toString(),
                title: savedEvent.title,
                start: start.toISOString(),
                end: end.toISOString(),
                type: savedEvent.description,
                description: savedEvent.description || "",
                backgroundColor: getEventColor(savedEvent.description),
                borderColor: getEventColor(savedEvent.description),
                textColor: 'white'
            }]);

            setOpen(false);
        } catch (err) {
            console.error("Erreur lors de l’ajout :", err);
            alert("Impossible d'ajouter l'événement");
        }
    };


    const handleEventClick = (arg: EventClickArg) => {
        setSelectedEvent(arg);
        setDeleteDialogOpen(true);
    };
    const handleConfirmDelete = async () => {
        if (!selectedEvent) return;

        try {
            if (id) {
                await deletePlayerEvent(selectedEvent.event.id);
            } else {
                await deleteUserEvent(selectedEvent.event.id);
            }

            setEvents(prev =>
                prev.filter(e => e.id !== String(selectedEvent.event.id))
            );
            toast.success("L'événement a bien été supprimé !");
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
            toast.error("Un problème est survenu lors de la suppression de l'événement");
        } finally {
            setDeleteDialogOpen(false);
            setSelectedEvent(null);
        }
    };


    useEffect(() => {
        const loadAgenda = async () => {
            setLoading(true);
            try {
                let data;
                if (id) {
                    // on récupère l'agenda du joueur
                    data = await fetchPlayerAgenda(id);
                } else {
                    // agenda de l'utilisateur connecté
                    data = await fetchUserAgendas();
                }

                const formattedEvents:AgendaEventFormatted[] = data.map((ev:AgendaEventFormatted) => ({
                    id: ev.id.toString(),
                    title: ev.title,
                    start: ev.dateHeureDebut,
                    end: ev.dateHeureFin,
                    description: ev.description || "",
                    type: ev.type || ev.ownerType || "autre",
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
    }, [id]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setHeaderToolbar({left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay"});
            } else if (window.innerWidth < 1024) {
                setHeaderToolbar({left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay"});
            } else {
                setHeaderToolbar({left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay"});
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;
    return (
        <Pages title="agenda">
            <Box
                sx={{
                    "& .fc-toolbar-title": {
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: {xs: "16px", md: "20px"},
                    },
                    "& .fc-button": {
                        fontSize: {xs: "12px", md: "14px"},
                        padding: {xs: "0.3em 0.6em", md: "0.5em 1em"},
                    },
                    "& .fc-header-toolbar": {
                        flexWrap: {xs: "wrap", md: "nowrap"},
                        justifyContent: {xs: "center", md: "space-between"},
                        gap: {xs: 1, md: 2},
                    },
                }}
            >
                <FullCalendar
                    locale={frLocale}
                    timeZone="local"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={headerToolbar}
                    allDaySlot={false}
                    slotMinTime={"08:00:00"}
                    slotMaxTime={"18:00:00"}
                    events={events}
                    expandRows={true}
                    eventContent={(arg) => {
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
                <Box sx={{display: "flex", gap: 2, mt: 2}}>
                      <span style={{background: "red", padding: "4px 8px", borderRadius: "4px", color: "white"}}>
                        Match
                      </span>
                    <span style={{background: "green", padding: "4px 8px", borderRadius: "4px", color: "white"}}>
                        Entraînement
                      </span>
                    <span style={{background: "blue", padding: "4px 8px", borderRadius: "4px", color: "white"}}>
                        RDV Médical
                      </span>
                    <span style={{background: "orange", padding: "4px 8px", borderRadius: "4px", color: "white"}}>
                        Autre RDV
                      </span>
                </Box>


                <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{sx: {backgroundColor: "#f9f9f9"}}}>
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
                            MenuProps={{PaperProps: {sx: {backgroundColor: "white"}}}}
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
                <ConfirmDialog
                    open={deleteDialogOpen}
                    message={`Êtes-vous sûr de vouloir supprimer l'événement "${selectedEvent?.event.title}" ?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleteDialogOpen(false)}
                    confirmText="Supprimer"
                    cancelText="Annuler"
                    PaperProps={{sx: {backgroundColor: "#f9f9f9"}}}

                />

            </Box>
        </Pages>
    );
};

export default Agenda;
