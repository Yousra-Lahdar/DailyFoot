import { Outlet, useLocation } from "react-router";
import HeaderAgent from "../pages/A-header/HeaderAgent";
import { Box } from "@mui/material";
import FooterWithoutLogo from "../pages/C-footer/FooterWithoutLogo";
import FooterWithLogo from "../pages/C-footer/FooterWithLogo";


const LayoutWithBarAgent = () => {
    const location = useLocation();
    const noLogoRoutes = ["/statistic", "/agenda", "/players", "/", "/2"];
    const useFooterWithoutLogo = noLogoRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
    return (
        
        <>
         <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", 
            }}
            >

        
            <HeaderAgent/>
             <Box sx={{ flex: 1 }}>
            <Outlet/>
             </Box>
             {useFooterWithoutLogo ? <FooterWithoutLogo /> : <FooterWithLogo />}
        </Box>
        </>
    )
}

export default LayoutWithBarAgent;
