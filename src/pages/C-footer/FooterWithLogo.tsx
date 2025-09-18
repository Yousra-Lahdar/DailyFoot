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
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 1, sm: 3 },
                px: { xs: 2, sm: 5 },
                py: { xs: 2, sm: 3 },
                mt: "auto",
                textAlign: { xs: "center", sm: "left" },
            }}
        >
            <Box sx={{ display: "flex",flexDirection: { xs: "column", sm: "row" }, alignItems: "center",gap: { xs: 1, sm: 3 } }}>
            <Box sx={{ display: "flex", gap: 3 }} >
                <Link href="/conditions" underline="none" color="#666666" fontWeight="bold" >
                    Conditions générales
                </Link>
                <Link href="/mentions" underline="none" color="#666666" fontWeight="bold">
                    Mentions légales
                </Link>
            </Box>

                <Box
                    component="img"
                    src={logo}
                    alt="DailyFoot Logo"
                    sx={{
                        height: "30px",
                        width: "30px",
                        my: { xs: 1, sm: 0 },
                    }}
                />

                <Typography variant="body2" color="text.secondary">
                    © 2025 SYS — Tous droits réservés
                </Typography>

                <Link href="/contact" underline="none" color="#666666" fontWeight="bold">
                    Nous Contacter
                </Link>
            </Box>
        </Box>
    );
};

export default FooterWithLogo;