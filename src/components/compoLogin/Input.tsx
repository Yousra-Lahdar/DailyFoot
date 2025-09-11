import React from 'react';
import '../compoDashboard/imput.css';

type ImputProps = {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    errorText?: string;
};

const Input: React.FC<ImputProps> = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    helperText,
    onBlur
}) => {
    return (
        <div className="container">
            <input 
                required 
                type={type} 
                name={name} 
                className={`input ${error ? "input-error" : ""}`} 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
            />
            <label className="label">{label}</label>
            <div className="helper-slot">
                <p className={`error-message ${error && helperText ? '' : 'error-hidden'}`}>
                    {helperText || ' '}
                </p>
            </div>
        </div>
    );
};

export default Input;