import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";

const FootSiteCard = () => {
    const sites = [
        {
            name: "ESPN",
            url: "https://www.espn.com",
            image: "https://a1.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fespn_logos%2Fespn_red.png",
        },
        {
            name: "Goal",
            url: "https://www.goal.com",
            image: "https://m.media-amazon.com/images/I/41mNURK9VkL.png",
        },
        {
            name: "Ligue 1",
            url: "https://www.ligue1.com",
            image: "https://logos-world.net/wp-content/uploads/2024/06/Ligue-1-Logo-New.png",
        },
    ];

    return (
        <Card sx={{ p: 3, height: "100%",mt:-4,backgroundColor:"#F28C00" }}>
            <CardContent sx={{backgroundColor:"#ffffff",display:"flex",flexDirection:"column"}}>
                <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
                    Sites de Foot
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap",flexDirection: "column",justifyItems:"center",alignItems:'center',gap:10}}>
                    {sites.map((site) => (
                        <Card
                            key={site.name}
                            sx={{
                                cursor: "pointer ",
                                width: 200,
                                height:150,
                                "&:hover": { transform: "scale(1.05)", transition: "0.2s" },
                            }}
                            onClick={() => window.open(site.url, "_blank")}
                        >
                            <CardMedia
                                component="img"
                                image={site.image}
                                alt={site.name}
                                sx={{ height: 150,width:200, objectFit: "contain", p: 1 }}
                            />
                        </Card>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default FootSiteCard;
