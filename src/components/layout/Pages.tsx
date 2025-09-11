import type { ReactNode } from "react";
import { Box } from "@mui/material";
import FooterWithLogo from "../../pages/C-footer/FooterWithLogo.tsx"; // ou FooterWithoutLogo

type PagesProps = {
    children: ReactNode;
    title: string;
};

const Pages = ({ children, title }: PagesProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
            }}
        >
            <title>{title}</title>
            <Box sx={{ flex: 1 }}>{children}</Box>
            <FooterWithLogo />
        </Box>
    );
};

export default Pages;
