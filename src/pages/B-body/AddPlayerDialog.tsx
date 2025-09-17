import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";

export interface Player {
    name: string;
    age?: string;
    nationality?: string;
    poste?: string;
    club?: string;
    email?: string;
    image?: string;
}

type AddPlayerDialogProps = {
    open: boolean;
    onClose: () => void;
    onCreate: (player: Player) => Promise<void> | void;
};

const AddPlayerDialog: React.FC<AddPlayerDialogProps> = ({
                                                             open,
                                                             onClose,
                                                             onCreate,
                                                         }) => {
    const [form, setForm] = useState<Player>({
        name: "",
        age: "",
        nationality: "",
        poste: "",
        club: "",
        email: "",
        image: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setForm({
                name: "",
                age: "",
                nationality: "",
                poste: "",
                club: "",
                email: "",
                image: "",
            });
            setError(null);
            setLoading(false);
        }
    }, [open]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setError("Le nom est requis");
            return;
        }

        try {
            setLoading(true);
            await onCreate(form);
            onClose();
        } catch (err: any) {
            setError(err?.message || "Erreur lors de l’ajout du joueur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="xs" fullWidth>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle>Ajouter un joueur</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Nom"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        label="Age"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Nationalité"
                        name="nationality"
                        value={form.nationality}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Poste"
                        name="poste"
                        value={form.poste}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Club"
                        name="club"
                        value={form.club}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Image"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        fullWidth
                    />
                    {error && <Typography color="error">{error}</Typography>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Création..." : "Ajouter"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AddPlayerDialog;
