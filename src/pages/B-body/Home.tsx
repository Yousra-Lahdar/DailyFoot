
import SplitText from "../../components/compoTheDashboard/SplitText.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";


const Home = () => {
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const navigate = useNavigate();

    return (
        <div style={{
            background: "linear-gradient(16deg, rgba(192, 110, 4, 1) 23%, rgba(246, 154, 3, 1) 48%, rgba(255, 244, 158, 1) 72%, rgba(255, 224, 178, 1) 100%)",
            backgroundColor: "#C06E04",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            width: "100%",
            display: "flex", alignItems:"center",justifyContent:"center",flexDirection:"column"
        }}>
            <img
                src="/logo-dailyfoot.png"
                alt="Logo DailyFoot"
                style={{  width: 500, borderRadius: 70, boxShadow:"0px 2px 10px rgba(0,0,0,0.25)"  }}
            />

            <SplitText
                text=" Vos talents, Votre réussite, Notre outil"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                tag="h1"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
            />
            <Button type="submit" onClick={() => navigate("/Login")} style={{color:"#f69a03",backgroundColor:"#ffffff",fontSize:"20px"}} >Page de connexion</Button>

        </div>

    );
};


export default Home;

