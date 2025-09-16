// components/ConfirmDialog.tsx
import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, type DialogProps} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    PaperProps?: DialogProps['PaperProps'];
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         open,
                                                         title = "Confirmation",
                                                         message,
                                                         onConfirm,
                                                         onCancel,
                                                         confirmText = "Confirmer",
                                                         cancelText = "Annuler",
                                                         PaperProps,
                                                     }) => {
    return (
        <Dialog open={open} onClose={onCancel} PaperProps={PaperProps} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">{cancelText}</Button>
                <Button onClick={onConfirm} color="error" variant="contained">{confirmText}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
