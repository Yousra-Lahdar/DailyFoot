import './btnImput.css'
import {useEffect} from "react";


type BtnLoginProps = {
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;

};

const BtnLogin = ({ label, type = "button", onClick, disabled, style, children }: BtnLoginProps) => {

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !disabled && onClick) {
                onClick();
            }
        };

        window.addEventListener("keydown", handleEnter);

        return () => {
            window.removeEventListener("keydown", handleEnter);
        };
    }, [onClick, disabled]);

        return (
        <button 
            type={type} 
            onClick={onClick} 
            className="btn"
            disabled={disabled}
            style={style}

        >
            {children ?? label}
        </button>
    );
};

export default BtnLogin;
