import { Card, CardActionArea, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddPlayerCardProps = {
  onClick?: () => void;
};

const AddPlayerCard = ({ onClick }: AddPlayerCardProps) => {
  return (
    <Card
      sx={{
        width: 200,
        height: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        border: "2px dashed orange",
        backgroundColor: "white",
        "&:hover": {
          borderColor: "primary.main",
          backgroundColor: "action.hover",
        },
      }}
      elevation={0}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <AddIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </Box>
        <Typography variant="body1" color="textSecondary">
          Ajouter un joueur
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default AddPlayerCard;
