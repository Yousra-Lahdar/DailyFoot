// components/ConfirmDialog.tsx
import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import type {ConfirmDialogProps} from "../../../types/ConfirmDialogProps.ts";

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
        <Dialog open={open} onClose={onCancel} PaperProps={PaperProps}>
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
