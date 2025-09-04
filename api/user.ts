import axios from "axios";
import {BASE_API_URL} from "../constants";
const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const response = await axios.get(`${BASE_API_URL}/users/me`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(response.data);
        return response.data;
    } catch(error){
        console.error(error);
    }

}

export default fetchUserDetails;
