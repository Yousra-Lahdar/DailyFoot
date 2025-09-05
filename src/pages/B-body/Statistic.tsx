import axios from "axios";
import { useEffect } from "react";
import { BASE_API_URL } from "../../../constants";

const Statistic = () => {

    const fetchDataStats = async () => {
    try {
        const response =await axios.get(BASE_API_URL + "/statistique");
        console.log(response)
    }
    catch (error:any) {
        console.log(error.response?.data || error.message);
        alert("Le code d'accès est incorrect");
    }
    }

    useEffect(() => {
        fetchDataStats()
    }, []);


    return (
        <>
        </>
    );
};

export default Statistic;
