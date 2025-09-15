import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import CardPlayer from "../../components/players/CardPlayer.tsx";
import AddPlayerCard from "./AddPlayerCard.tsx";
import { usePlayers } from "../../../hooks/use-players.hook.ts";
import axios from "axios";
import { BASE_API_URL } from "../../../constants.ts";

interface Player {
  id: number;
  name: string;
  age?: string;
  nationality?: string;
  poste?: string;
  club?: string;
  email?: string;
  image?: string;
}

const Players = () => {
  const { players, loading, error, refetch } = usePlayers();

  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const [form, setForm] = useState<Player>({
    id: 0,
    name: "",
    age: "",
    nationality: "",
    poste: "",
    club: "",
    email: "",
    image: "",
  });

  const handleAddPlayer = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  // --- Ouvrir la confirmation ---
  const handleOpenConfirm = (playerId: number) => {
    setSelectedPlayerId(playerId);
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setSelectedPlayerId(null);
    setConfirmOpen(false);
  };

  // --- Supprimer avec confirmation ---
  const deletePlayer = async () => {
    if (!selectedPlayerId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`${BASE_API_URL}/players/${selectedPlayerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await refetch(); // recharge les joueurs depuis le backend
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Impossible de supprimer le joueur.");
    } finally {
      handleCloseConfirm();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Le nom est requis");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(BASE_API_URL + "/agent", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await refetch();

      setForm({
        id: 0,
        name: "",
        age: "",
        nationality: "",
        poste: "",
        club: "",
        email: "",
        image: "",
      });
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’ajout du joueur.");
    }
  };

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack sx={{ p: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 3,
          justifyItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {players.map((player, idx) => (
          <Box key={(player.name || "player") + idx} sx={{ mb: 2 }}>
            <CardPlayer player={player} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenConfirm(player.id)}
              >
                Supprimer
              </Button>
            </Box>
          </Box>
        ))}

        <AddPlayerCard onClick={handleAddPlayer} />
      </Box>

      {/* Dialog d’ajout */}
      <Dialog open={openDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Ajouter un joueur</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              autoFocus
              label="Nom"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
            <TextField
              label="Nationalité"
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
            />
            <TextField
              label="Poste"
              name="poste"
              value={form.poste}
              onChange={handleChange}
            />
            <TextField
              label="Club"
              name="club"
              value={form.club}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Image"
              name="image"
              value={form.image}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained">
              Ajouter
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={confirmOpen} onClose={handleCloseConfirm}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer ce joueur ? Cette action est
            irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Annuler</Button>
          <Button onClick={deletePlayer} variant="contained" color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Players;



