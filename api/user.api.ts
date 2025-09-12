import axios from "axios";
import {BASE_API_URL} from "../constants";

const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const response = await axios.get(`${BASE_API_URL}/users/me`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const updateUser = async (formData: any) => {
    return await axios.put(`${BASE_API_URL}/users/update`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    });
}

const fetchUserAgendas = async () => {
    const token = localStorage.getItem("token");
    if (!token) return [];
    try {
        const response = await axios.get(`${BASE_API_URL}/agenda/me`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }

    }
const addUserEvent = async (event: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const response = await axios.post(`${BASE_API_URL}/agenda/event`, event, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteUserEvent = async (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token manquant");
    return axios.delete(`${BASE_API_URL}/agenda/event/${eventId}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
};
const fetchPlayerAgenda = async (playerId: string) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token manquant");
    const res = await axios.get(`${BASE_API_URL}/agenda/player/${playerId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export {fetchPlayerAgenda, deleteUserEvent, addUserEvent, fetchUserAgendas,fetchUserDetails,updateUser};

