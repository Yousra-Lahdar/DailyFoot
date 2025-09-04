import Profil from "../../components/compoStat/Profil.tsx";
import CardStatistic from "../../components/compoStat/CardStatistic.tsx";
import CardMatch from "../../components/compoStat/CardMatch.tsx";
import { Box } from "@mui/material";

const Statistic = () => {

    return (
        <Box sx={{ display: "flex", gap:15, p: 2 , justifyContent: "center" ,mb:9,mt:2}}>
            <Profil />
            <CardStatistic />
            <CardMatch />
        </Box>
    );
};

export default Statistic;
