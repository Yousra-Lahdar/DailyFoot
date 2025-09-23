import React from "react";

export type BtnLoginProps = {
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;

};