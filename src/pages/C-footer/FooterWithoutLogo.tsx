import { Box, Link, Typography, useTheme } from "@mui/material";

const FooterWithoutLogo = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 40px",
                height: "64px",
                mt: "auto",
                [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    height: "auto",
                    gap: 1.5,
                },
            }}
        >
            <Box sx={{ display: "flex", gap: 3 }}>
                <Link href="/conditions" underline="none" color="black" fontWeight="bold">
                    Conditions générales
                </Link>
                <Link href="/mentions" underline="none" color="black" fontWeight="bold">
                    Mentions légales
                </Link>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    © 2025 SYS — Tous droits réservés
                </Typography>
            </Box>
            <Box>
                <Link href="/contact" underline="none" color="black" fontWeight="bold">
                    Nous Contacter
                </Link>
            </Box>
        </Box>
    );
};

export default FooterWithoutLogo;
