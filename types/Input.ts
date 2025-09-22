import React from "react";

export type InputProps = {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};