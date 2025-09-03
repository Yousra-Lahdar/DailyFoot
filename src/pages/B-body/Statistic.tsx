import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import playerImg from "../../assets/logo-joueur.webp";  
import fieldImg from "../../assets/terrain de foot.jpg";
import { Grid } from "@mui/material";
const Statistic = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        
     
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src={playerImg}
              alt="Joueur"
              sx={{ width: "209px", height: "271px", borderRadius: "50%", mb: 2 }}
            />
            <Typography variant="h6">Alex Saran</Typography>
            <Typography fontWeight="bold">20 ans</Typography>
            <Typography>France</Typography>
            <Typography sx={{ mt: 1 }}>1.70 cm</Typography>
            <Typography>60 kg</Typography>
            <Typography>SMI 6,9</Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Son Agenda
            </Button>
          </Paper>
        </Grid>

      
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "orange", p: 1 }}>
              <Typography variant="h6" sx={{ color: "white" }}>
                Statistiques
              </Typography>
              <Button size="small" variant="text" sx={{ color: "white" }}>
                Modifier
              </Button>
            </Box>

            <Box sx={{ display: "flex", mt: 2 }}>
              {/* Liste des stats */}
              <Box sx={{ flex: 1 }}>
                <Typography>But(s) : 8</Typography>
                <Typography>Passe(s) décisive(s) : 8</Typography>
                <Typography>Carton(s) jaune(s) : 3</Typography>
                <Typography>Carton(s) rouge(s) : 1</Typography>
                <Typography>Matchs joués : 30</Typography>
                <Typography>Meilleur ELO : 37 (+1)</Typography>
              </Box>

              {/* Graphique radar (placeholder) */}
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography>(Graph radar ici)</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Image du terrain */}
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src={fieldImg}
              alt="Terrain de foot"
              sx={{ maxWidth: "100%", height: "455px" }}
            />
          </Paper>
        </Grid>

        {/* Colonne droite : historique des matchs */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, backgroundColor: "#fff3cd" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Historiques des matchs
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Liste factice */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Typography key={i} sx={{ mb: 1 }}>
                Match {i + 1}
              </Typography>
            ))}
            <Button variant="outlined" sx={{ mt: 2 }}>
              Voir les matchs
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistic;
