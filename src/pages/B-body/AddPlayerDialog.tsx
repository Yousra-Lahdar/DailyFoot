import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

type Player = { name: string; role?: string; [key: string]: any };

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (player: Player) => Promise<void> | void;
};

const AddPlayerDialog: React.FC<Props> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // reset form when the dialog is closed
    if (!open) {
      setName("");
      setRole("");
      setError(null);
      setLoading(false);
    }
  }, [open]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError("Le nom est requis");
      return;
    }

    const payload: Player = {
      name: name.trim(),
      role: role.trim() || undefined,
    };

    try {
      setLoading(true);
      await onCreate(payload); // délègue la création à la fonction passée en prop
      onClose();
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="xs" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Ajouter un joueur</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoFocus
          />
          <TextField
            label="Rôle (optionnel)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onClose()} disabled={loading}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Création..." : "Créer"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddPlayerDialog;
