import type {DialogProps} from "@mui/material";

export interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    PaperProps?: DialogProps['PaperProps'];
}