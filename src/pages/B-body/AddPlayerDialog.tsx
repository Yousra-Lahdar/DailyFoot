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
import type {Player} from "../../../types/Player.ts";

export interface Player {
    name: string;
    age?: number;
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
    playerToEdit?: Player;
    onUpdate?: (player: Player) => Promise<void> | void;
};

const AddPlayerDialog: React.FC<AddPlayerDialogProps> = ({
    open, 
    onClose,
    onCreate,
    playerToEdit,
    onUpdate,
}) => {
    const [form, setForm] = useState<Player>({
        name: "",
        age: 0,
        nationality: "",
        poste: "",
        height: 0,
        weight: 0,
        club: "",
        email: "",
        image: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (playerToEdit) {
            setForm(playerToEdit)
        } else if(!open) {
            setForm({
                name: "",
                age: 0,
                nationality: "",
                height: 0,
                weight: 0,
                poste: "",
                club: "",
                email: "",
                image: "",
            });
            setError(null);
            setLoading(false);
        }
    }, [playerToEdit, open]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;
        const numericFields = ["age", "agentId", "userId"];
        setForm((prev) => ({ ...prev, [name]: 
            numericFields.includes(name)
            ? value === ""
            ? undefined
            : Number(value) : value}));

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setError("Le nom est requis");
            return;
        }

        try {
            setLoading(true);
           if (playerToEdit && onUpdate) {
            await onUpdate (form);
        } else { 
            await onCreate(form);
        } 
        
        onClose();
        } catch (err: any) {
            setError(err?.message || "Erreur lors de l’ajout du joueur");
        } finally {
            setLoading(false);
        }
    };

    return (

        <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="xs" fullWidth PaperProps={{sx: {backgroundColor: "#f9f9f9"}}}>

            <Box component="form" onSubmit={handleSubmit}>

                <DialogTitle>{playerToEdit ? "Modifier un joueur" : "Ajouter un joueur"}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    <TextField
                        label="Nom"
                        name="name"
                        value={form.name ?? ""}
                        onChange={handleChange}
                        required
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={form.age ?? ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Nationalité"
                        name="nationality"
                        value={form.nationality ?? ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Poste"
                        name="poste"
                        value={form.poste ?? ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Club"
                        name="club"
                        value={form.club ?? ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Taille"
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Poids"
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email ?? ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Image"
                        name="image"
                        value={form.image ?? ""}
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
                        {loading ? "Enregistrement..." : playerToEdit ? "Enregistrer" : "Ajouter"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AddPlayerDialog;
