import type { ReactNode } from "react";
import { Box } from "@mui/material";


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

        </Box>
    );
};

export default Pages;
