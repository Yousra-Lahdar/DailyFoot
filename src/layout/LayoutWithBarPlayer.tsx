import { Outlet } from "react-router";
import HeaderPlayer from "../pages/A-header/HeaderPlayer";
import FooterFirst from "../pages/C-footer/FooterWithLogo";
import { Box } from "@mui/material";

const LayoutWithBarPlayer = () => {

    return (
        <>
         <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", 
            }}
            >
                <HeaderPlayer/>
                <Box sx={{ flex: 1 }}>
                <Outlet/>
                </Box>
                <FooterFirst/>
        </Box>
        </>
    )
}

export default LayoutWithBarPlayer;
