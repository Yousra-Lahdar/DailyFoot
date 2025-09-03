import { Box, Link, useTheme } from "@mui/material";

const FooterWithoutLogo = () => {
    const theme = useTheme();

    return (

        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.grey[300],
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 40px",
                height: "64px",
                mt:"auto",

            }}
        >

            <Box sx={{ display: "flex", gap: 3, }}>
                <Link href="/conditions" underline="none" color="black" fontWeight="bold">
                    Conditions générales
                </Link>
                <Link href="/mentions" underline="none" color="black" fontWeight="bold">
                    Mentions légales
                </Link>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <p>Copyright © 2025 SYS</p>
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
