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
    if (!token) return;
    try {
        const response = await axios.get(`${BASE_API_URL}/agenda`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data;
    } catch (error) {
        console.error(error);
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

export {addUserEvent, fetchUserAgendas,fetchUserDetails,updateUser};

