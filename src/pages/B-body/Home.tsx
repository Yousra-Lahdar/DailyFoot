import SplitText from "../../components/compoHome/SplitText.tsx";
import { Button, Box} from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();

    const handleAnimationComplete = () => {
        console.log("All letters have animated!");
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(16deg, rgba(192,110,4,1) 23%, rgba(246,154,3,1) 48%, rgba(255,244,158,1) 72%, rgba(255,224,178,1) 100%)",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 3 },
                py: { xs: 4, md: 8 },
                flexDirection: "column",
                textAlign: "center",
            }}
        >
            <Box
                component="img"
                src="/logo-dailyfoot.png"
                alt="Logo DailyFoot"
                sx={{
                    width: { xs: "80%", sm: 400, md: 500 },
                    maxWidth: 500,
                    borderRadius: 5,
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.25)",
                    mb: { xs: 3, md: 5 },
                }}
            />

            <SplitText
                text="Vos talents, Votre réussite, Notre outil"
                tag="h1"
                className="text-2xl font-semibold"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
                style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
                    marginBottom: "2rem",
                    fontWeight: "bold",
                    color: "#ffffff",
                }}
            />

            <Button
                onClick={() => navigate("/Login")}
                sx={{
                    color: "#f69a03",
                    backgroundColor: "#ffffff",
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    px: { xs: 2, sm: 4 },
                    py: { xs: 1, sm: 2 },
                    borderRadius: 2,
                    mt: 2,
                    "&:hover": { backgroundColor: "#f2f2f2" },
                }}
            >
                Page de connexion
            </Button>
        </Box>
    );
};

export default Home;