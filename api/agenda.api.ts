import axios from "axios";
import { BASE_API_URL } from "../constants";
import type { AgendaEvent } from "../types/AgendaEvent.ts";

// Récupérer l'agenda du joueur
export const fetchPlayerAgenda = (playerId: string): Promise<AgendaEvent[]> => {
    const token = localStorage.getItem("token");
    return axios
        .get(`${BASE_API_URL}/agenda/player/${playerId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data);
};

// Récupérer l'agenda de l'utilisateur connecté (agent)
export const fetchUserAgendas = (): Promise<AgendaEvent[]> => {
    const token = localStorage.getItem("token");
    return axios
        .get(`${BASE_API_URL}/agenda/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data);
};

// Ajouter un événement pour l'utilisateur connecté
export const addUserEvent = (event: any): Promise<AgendaEvent> => {
    const token = localStorage.getItem("token");
    return axios
        .post(`${BASE_API_URL}/agenda/event`, event, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data);
};

// Supprimer un événement pour l'utilisateur connecté
export const deleteUserEvent = (eventId: number | string): Promise<void> => {
    const token = localStorage.getItem("token");
    return axios
        .delete(`${BASE_API_URL}/agenda/event/${eventId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data);
};

// Ajouter un événement pour un joueur spécifique
export const addEventForPlayer = (playerId: string, event: any): Promise<AgendaEvent> => {
    const token = localStorage.getItem("token");
    return axios
        .post(`${BASE_API_URL}/agenda/event/player/${playerId}`, event, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data);
};

// Supprimer un événement d'un joueur spécifique
export const deletePlayerEvent = (eventId: string | number): Promise<void> => {
    const token = localStorage.getItem("token");
    return axios
        .delete(`${BASE_API_URL}/agenda/event/player/${eventId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data);
};
