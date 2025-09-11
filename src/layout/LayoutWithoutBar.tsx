import {Outlet} from "react-router";
import FooterWithLogo from "../pages/C-footer/FooterWithLogo.tsx";
import {Box} from "@mui/material";

const LayoutWithoutBar = () => {

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Outlet/>
            <FooterWithLogo/>
        </Box>
    );
};

export default LayoutWithoutBar;
