import { Card, CardContent, Typography,  Box } from "@mui/material";

const CardMatch = () => {
    return (
        <Card sx={{ width: 350, bgcolor: "#fff8e1", borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ color: "orange", fontWeight: "bold", mb: 2 }}
                >
                    Historiques des matchs
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Match 1</Typography>
                    <Typography variant="body2">Match 2</Typography>
                    <Typography variant="body2">Match 3</Typography>
                    <Typography variant="body2">Match 4</Typography>
                    <Typography variant="body2">Match 5</Typography>
                </Box>

            </CardContent>
        </Card>
    );
};

export default CardMatch;
