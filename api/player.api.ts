import axios from "axios";
import {BASE_API_URL} from "../constants";
import type {Player, PlayerWithId} from "../types/Player.ts";

const createPlayer = async (player: Player):Promise<PlayerWithId> => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_API_URL}/agent`, player, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
};

export { createPlayer };
