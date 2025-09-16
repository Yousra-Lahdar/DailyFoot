import {useNavigate} from "react-router";
import {updateUser} from "../api/user.api.ts";

export const useUserUpdate = (formData: any, setErrors: any) => {
    const navigate = useNavigate();

    const userUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
            return;
        }
        try {
            await updateUser(formData);
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 400){
                setErrors(error.response.data);
            } else {
                console.error(error);
            }
        }
    };

    return userUpdate;
};
