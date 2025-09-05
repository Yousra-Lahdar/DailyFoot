import Profil from "../../components/compoStat/Profil.tsx";
import CardStatistic from "../../components/compoStat/CardStatistic.tsx";
import CardMatch from "../../components/compoStat/CardMatch.tsx";
import { Box } from "@mui/material";
import { BASE_API_URL } from "../../../constants.ts";
import axios from "axios";
import { useEffect } from "react";

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
        <Box sx={{ display: "flex", gap:15, p: 2 , justifyContent: "center" ,mb:9,mt:2}}>
            <Profil />
            <CardStatistic />
            <CardMatch />
        </Box>
    );
};

export default Statistic;
