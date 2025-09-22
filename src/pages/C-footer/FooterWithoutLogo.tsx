import {Box, Typography, useTheme} from "@mui/material";

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
                height: "34px",
                mt: "auto",
                [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    height: "auto",
                    gap: 1.5,
                },
            }}
        >
            <Box sx={{flexGrow: 1, textAlign: "center"}}>
                <Typography variant="body2" color="text.secondary">
                    © 2025 SYS — Tous droits réservés
                </Typography>
            </Box>

        </Box>
    );
};

export default FooterWithoutLogo;
