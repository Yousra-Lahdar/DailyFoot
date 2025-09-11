import { Outlet } from "react-router";
import HeaderAgent from "../pages/A-header/HeaderAgent.tsx";
import FooterWithoutLogo from "../pages/C-footer/FooterWithoutLogo.tsx";
import {Box} from "@mui/material";

const LayoutWithBarAgent = () => {

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <HeaderAgent/>
            <Outlet/>
            <FooterWithoutLogo/>

        </Box>
    );
};

export default LayoutWithBarAgent;
