import './btnInput.css'
import {useEffect} from "react";
import type {BtnLoginProps} from "../../../types/ButtonLoginProps.ts";
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
