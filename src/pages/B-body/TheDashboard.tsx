
import SplitText from "../../components/compoTheDashboard/SplitText.tsx";
import ScrollStack, {ScrollStackItem} from "../../components/compoTheDashboard/ScrollStack.tsx";

const TheDarshboard = () => {
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

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
                text=" Vos talent , Votre reusite, Notre outil"
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


            <ScrollStack>
                <ScrollStackItem>
                    <h2>Card 1</h2>
                    <p>This is the first card in the stack</p>
                </ScrollStackItem>
                <ScrollStackItem>
                    <h2>Card 2</h2>
                    <p>This is the second card in the stack</p>
                </ScrollStackItem>
                <ScrollStackItem>
                    <h2>Card 3</h2>
                    <p>This is the third card in the stack</p>
                </ScrollStackItem>
            </ScrollStack>

        </div>

    );
};

export default TheDarshboard;
