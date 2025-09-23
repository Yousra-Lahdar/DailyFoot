import React, { useState } from 'react';
import './input.css';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type {InputProps} from "../../../types/Input.ts"
const Input: React.FC<InputProps> = ({
                                         label,
                                         name,
                                         type = "text",
                                         value,
                                         onChange,
                                         error,
                                         helperText,
                                         onBlur
                                     }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container" style={{ position: "relative" }}>
            <input
                required
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                name={name}
                className={`input ${error ? "input-error" : ""}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            <label className="label">{label}</label>

            {/* Icône œil uniquement si type=password */}
            {type === "password" && (
                <IconButton
                    onClick={togglePasswordVisibility}
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "35%",
                        transform: "translateY(-50%)",
                        color:"#f69a03",
                        padding:4,

                    }}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            )}

            <div className="helper-slot">
                <p className={`error-message ${error && helperText ? '' : 'error-hidden'}`}>
                    {helperText || ' '}
                </p>
            </div>
        </div>
    );
};

export default Input;
