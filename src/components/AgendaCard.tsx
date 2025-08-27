import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

const AgendaCard = () => {
    return (
        <Card sx={{ mb: 4, p: 2 }}>
            <CardContent sx={{mb:4}}>
                <Typography variant="h6" gutterBottom>
                    Date
                </Typography>
                <Typography variant="body2" gutterBottom>
                    08/08/2025
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    {/* Matin */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1">Matin</Typography>
                        <Divider sx={{ bgcolor: "green", height: 6, borderRadius: 2, mb: 1 }} />
                        <Divider sx={{ bgcolor: "red", height: 6, borderRadius: 2, mb: 1 }} />
                        <Divider sx={{ bgcolor: "purple", height: 6, borderRadius: 2 }} />
                    </Box>

                    {/* Après-midi */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1">Après-midi</Typography>
                        <Divider sx={{ bgcolor: "green", height: 6, borderRadius: 2, mb: 1 }} />
                        <Divider sx={{ bgcolor: "red", height: 6, borderRadius: 2, mb: 1 }} />
                        <Divider sx={{ bgcolor: "purple", height: 6, borderRadius: 2 }} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AgendaCard;
