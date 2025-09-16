import logo from "../../assets/logo-daily.webp";
import {Box, Link, Typography, useTheme} from "@mui/material";

const FooterWithLogo = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 40px",
                height: "80px",
                mt: "auto",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center",gap: 3, marginRight: 4 }}>

                <Link href="/conditions" underline="none" color="#666666" fontWeight="bold">
                    Conditions générales
                </Link>
                <Link href="/mentions" underline="none" color="#666666" fontWeight="bold">
                    Mentions légales
                </Link>

                <Box
                    component="img"
                    src={logo}
                    alt="DailyFoot Logo"
                    sx={{
                        height: "30px",
                        width: "30px",
                        marginLeft:"40px"
                    }}
                />

                <Typography variant="body2" color="text.secondary">
                    © 2025 SYS — Tous droits réservés
                </Typography>

                <Link href="/contact" underline="none" color="#666666" fontWeight="bold" style={{marginLeft:"40px"}}>
                    Nous Contacter
                </Link>
            </Box>
        </Box>
    );
};

export default FooterWithLogo;
