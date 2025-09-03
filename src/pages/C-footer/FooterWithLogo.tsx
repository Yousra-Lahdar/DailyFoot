import logo from "../../assets/logo-daily.webp";
import { Box, Link, useTheme } from "@mui/material";

const FooterWithLogo = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                //border: '1px solid',
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 40px",
                height: "120px",
                mt:1.5
            }}
        >

            <Box sx={{ display: "flex", gap: 3, paddingTop:"80px"}}>
                <Link href="/conditions" underline="none" color="black" fontWeight="bold">
                    Conditions générales
                </Link>
                <Link href="/mentions" underline="none" color="black" fontWeight="bold">
                    Mentions légales
                </Link>
            </Box>


            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box
                    component="img"
                    src={logo}
                    alt="DailyFoot Logo"
                    sx={{
                        height: "100px",
                        width: "100px",
                        marginRight: "130px",

                    }}
                />
            </Box>


            <Box>
                <Link href="/contact" underline="none" color="black" fontWeight="bold">
                    Nous Contacter
                </Link>
            </Box>
        </Box>
    );
};

export default FooterWithLogo;
