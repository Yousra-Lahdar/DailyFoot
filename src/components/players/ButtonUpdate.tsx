import {Button, Stack} from "@mui/material";
import type {Props} from "../../../types/Player.ts";

const ButtonUpdate = ({player, onEdit, onDelete}: Props) => {

    return (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{mt: 1, mb: 1}}>
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    if (onEdit) onEdit(player);
                }}
            >
                Modifier
            </Button>
            <Button
                variant="contained"
                size="small"
                color="error"
                onClick={(e) => {
                    e.stopPropagation();
                    if (onDelete) onDelete(player.id);

                }}
            >
                Supprimer
            </Button>
        </Stack>
    );
};
export default ButtonUpdate;