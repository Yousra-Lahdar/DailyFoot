import { Outlet } from "react-router";
import HeaderPlayer from "../pages/A-header/HeaderPlayer.tsx";
import FooterWithoutLogo from "../pages/C-footer/FooterWithoutLogo.tsx";
import { Box } from "@mui/material";

const LayoutWithBarPlayer = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <HeaderPlayer />
            <Outlet />
            <FooterWithoutLogo />
        </Box>
    );
};

export default LayoutWithBarPlayer;
