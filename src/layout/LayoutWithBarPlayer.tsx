import { Outlet } from "react-router";
import HeaderPlayer from "../pages/A-header/HeaderPlayer.tsx";
import FooterWithoutLogo from "../pages/C-footer/FooterWithoutLogo.tsx";
import { Box } from "@mui/material";

const LayoutWithBarPlayer = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", 
            }}
        >
            <HeaderPlayer />

            
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>

            <FooterWithoutLogo />
        </Box>
    );
};

export default LayoutWithBarPlayer;
