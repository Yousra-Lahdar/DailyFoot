import axios from "axios";
import type {Agenda} from "../@types/agenda.model.ts";

export const fetchAgenda =async(id: number):Promise<Agenda> => {
    try {
        const reponse = await axios.get(`http://localhost:5000/agenda/agent/${id}`);
        return reponse.data;
    }catch(err) {
        console.error(err);
        return {} as Agenda;
    }
}