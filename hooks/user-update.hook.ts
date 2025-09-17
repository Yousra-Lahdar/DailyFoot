import { useNavigate } from "react-router";
import { updateUser } from "../api/user.api.ts";
import { toast } from "react-toastify";

export const useUserUpdate = (formData: any, setErrors: any) => {
    const navigate = useNavigate();
    const userUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) return;
        if (formData.password && formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
            toast.error("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            await updateUser(formData);
            toast.success("Votre compte a été mis à jour !");
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 400) {
                const message = error.response.data;
                if (typeof message === "string" && message.includes("Mot de passe actuel incorrect")) {
                    toast.error("Le mot de passe actuel est incorrect !");
                } else {
                    toast.error("Une erreur est survenue lors de la mise à jour.");
                }
                setErrors(error.response.data);
            } else {
                console.error(error);
                toast.error("Une erreur inattendue est survenue.");
            }
        }
    };

    return userUpdate;
};
