import { Card, CardContent, Typography, Box } from "@mui/material";

interface Match {
    id: number;
    date: string;
    opponent: string;
    score: string;
}

const CardMatch = ({ matches }: { matches?: Match[] }) => {
    const matchList = matches || []; // Valeur par défaut

    return (
        <Card sx={{ width: 350, bgcolor: "#fff8e1", borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ color: "orange", fontWeight: "bold", mb: 2 }}>
                    Historiques des matchs
                </Typography>

                <Box sx={{ mb: 2 }}>
                    {matchList.length > 0 ? (
                        matchList.map((match) => (
                            <Typography key={match.id} variant="body2">
                                {match.date} - {match.opponent} - {match.score}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body2">Aucun match disponible</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardMatch;
