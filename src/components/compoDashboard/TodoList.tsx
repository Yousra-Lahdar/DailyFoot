import {
    Avatar,
    Button,
    Card,
    CardContent,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";

const TodoList = () => {
    const todos = [
        { id: 1, text: "List item", checked: false },
        { id: 2, text: "List item", checked: true },
        { id: 3, text: "List item", checked: true }
    ];

    return (
        <Card sx={{ p: 3, height: "100%" ,mt:-4}}>
            <CardContent sx={{backgroundColor:"#efca89"}}>
                <Typography variant="h6" gutterBottom>
                    To-Do-List
                </Typography>
                <Typography variant="body2" gutterBottom>
                    sélectionner
                </Typography>

                <List>
                    {todos.map((todo) => (
                        <ListItem key={todo.id} secondaryAction={<Checkbox edge="end" checked={todo.checked} />}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "orange" }}>A</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={todo.text} secondary="100+" />
                        </ListItem>
                    ))}
                </List>

                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Ajouter
                </Button>
            </CardContent>
        </Card>
    );
};

export default TodoList;
