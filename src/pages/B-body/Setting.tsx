import {useLoaderData, useNavigate} from "react-router";
import {Box, Button, Typography} from "@mui/material";
import Imput from "../../components/compoLogin/Imput.tsx";
import BtnLogin from "../../components/compoLogin/BtnLogin.tsx";
import {useState} from "react";
import {useUserUpdate} from "../../../hooks/user-update.hook.ts";
import type {FormErrors} from "../../../types/FormErrors.ts";

const Setting = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(data || {});
    const [errors, setErrors] = useState<FormErrors>({});
    const userUpdate = useUserUpdate(formData, setErrors);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh"
        }}>
            <Typography
                variant="h5"
                sx={{fontWeight: "bold", color: "#c06e04"}}
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
                    style={{width: 120, borderRadius: 70}}
                />

                <Box
                    component="form"
                    sx={{
                        mt: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        width: '100%',
                        px: 4
                    }}
                    onSubmit={userUpdate}
                >
                    <Box sx={{width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center'}}>
                        <Imput
                            label="Nom"
                            name="name"
                            type="text"
                            value={formData.name || ""}
                            error={!!errors.name}
                            helperText={errors.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </Box>

                    <Box sx={{width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center'}}>
                        <Imput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email || ""}
                            error={!!errors.email}
                            helperText={errors.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}

                        />
                    </Box>

                    <Box sx={{width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center'}}>
                        <Imput
                            label="Nouveau mot de passe"
                            name="password"
                            type="password"
                            value={formData.password || ""}
                            error={!!errors.password}
                            helperText={errors.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}

                        />
                    </Box>

                    <Box sx={{width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center'}}>
                        <Imput
                            label="Confirmer le mot de passe"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword || ""}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}

                        />
                    </Box>

                    {errors.general && (
                        <Typography
                            color={errors.general.includes('succès') ? 'success.main' : 'error.main'}
                            sx={{mt: 2, textAlign: 'center'}}
                        >
                            {errors.general}
                        </Typography>
                    )}

                    <Box sx={{display: 'flex', gap: 2, mt: 2, mb: 4}}>
                        <BtnLogin
                            onClick={() => navigate(-1)}

                        >
                            Annuler
                        </BtnLogin>
                        <BtnLogin
                            type="submit"
                            style={{minWidth: 120}}
                        >
                            Valider
                        </BtnLogin>
                    </Box>

                    <Box sx={{mt: 3, display: "flex", alignItems: "center", gap: 4}}>
                        <Button
                            type="button"
                            onClick={() => navigate("/1")}
                            style={{color: "#f69a03"}}
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
