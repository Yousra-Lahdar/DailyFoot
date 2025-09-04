import { useNavigate } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import Imput from "../../components/compoLogin/Imput.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../constants.ts";

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

const Setting = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(`${BASE_API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setFormData({
                    name: res.data.name ?? "",
                    email: res.data.email ?? "",
                    password: "",
                    confirmPassword: ""
                });
            })
            .catch(err => console.error(err));
    }, []);

    const validateField = (name: string, value: string) => {
        let error = "";
        
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'L\'email est requis';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Format d\'email invalide';
                }
                break;
            case 'password':
                if (value && value.length < 6) {
                    error = 'Le mot de passe doit contenir au moins 6 caractères';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    error = 'Les mots de passe ne correspondent pas';
                }
                break;
            case 'name':
                if (!value.trim()) {
                    error = 'Le nom est requis';
                }
                break;
        }
        
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Mettre à jour la valeur du champ
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Valider le champ et mettre à jour les erreurs
        if (errors[name as keyof FormErrors]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };
    
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        // Valider chaque champ
        Object.keys(formData).forEach(key => {
            const value = formData[key as keyof typeof formData];
            const error = validateField(key, value);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });
        
        // Vérifier la correspondance des mots de passe
        if (formData.password && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        setErrors(prev => ({ ...prev, general: '' }));
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Non authentifié');
            }
            
            // Ne pas envoyer les champs de mot de passe s'ils sont vides
            const { password, confirmPassword, ...rest } = formData;
            const dataToSend = password ? { ...rest, password, confirmPassword } : rest;

            await axios.put(`${BASE_API_URL}/users/update`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            // Réinitialiser les champs de mot de passe après une mise à jour réussie
            if (formData.password) {
                setFormData(prev => ({
                    ...prev,
                    password: '',
                    confirmPassword: ''
                }));
            }
            
            // Afficher un message de succès
            setErrors({
                general: 'Profil mis à jour avec succès!'
            });
            
            // Rediriger après un délai
            setTimeout(() => {
                navigate(-1);
            }, 1500);
            
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setErrors(prev => ({
                    ...prev,
                    general: err.response?.data?.message || "Une erreur est survenue lors de la mise à jour du profil"
                }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", minHeight:"90vh" }}>
            <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#c06e04" }}
            >
                Modifier mon compte
            </Typography>

            <Box sx={{
                width: 562,
                minHeight: 622,
                height: 'auto',
                backgroundColor: "#FFE0B2",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 4,
                boxShadow: 7
            }}>
                <img
                    src="/logo-dailyfoot.png"
                    alt="Logo DailyFoot"
                    style={{ width: 120, borderRadius: 70 }}
                />

                <Box 
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 6, display: "flex", flexDirection:"column", alignItems: "center", gap: 4, width: '100%', px: 4 }}
            >
                <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
                    <Imput 
                        label="Nom" 
                        name="name" 
                        type="text" 
                        value={formData.name} 
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        onBlur={(e) => {
                            const error = validateField('name', e.target.value);
                            setErrors(prev => ({ ...prev, name: error }));
                        }}
                    />
                </Box>
                
                <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
                    <Imput 
                        label="Email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        onBlur={(e) => {
                            const error = validateField('email', e.target.value);
                            setErrors(prev => ({ ...prev, email: error }));
                        }}
                    />
                </Box>

                <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
                    <Imput 
                        label="Nouveau mot de passe" 
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        onBlur={(e) => {
                            const error = validateField('password', e.target.value);
                            setErrors(prev => ({ ...prev, password: error }));
                        }}
                    />
                </Box>
                
                <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
                    <Imput 
                        label="Confirmer le mot de passe" 
                        name="confirmPassword" 
                        type="password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        onBlur={(e) => {
                            const error = validateField('confirmPassword', e.target.value);
                            setErrors(prev => ({ ...prev, confirmPassword: error }));
                        }}
                    />
                </Box>
                
                {errors.general && (
                    <Typography 
                        color={errors.general.includes('succès') ? 'success.main' : 'error.main'}
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        {errors.general}
                    </Typography>
                )}
                
                <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
                    <BtnLogin
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                    >
                        Annuler
                    </BtnLogin>
                    <BtnLogin 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ minWidth: 120 }}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </BtnLogin>
                </Box>

                <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 4 }}>
                    <Button 
                        type="button" 
                        onClick={() => navigate("/1")} 
                        style={{ color: "#f69a03" }}
                    >
                        Retour page principal
                    </Button>
                </Box>
            </Box>
        </Box>
        </Box>
    );
};

export default Setting;
