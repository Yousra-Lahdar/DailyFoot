import { createTheme } from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material';

const palette: PaletteOptions = {
    primary: {
        main: '#F28C00',
        contrastText: '#FFFFFF',
    },
    /*secondary: {
      main: '',
      contrastText: '',
    },*/
    background: {
        default: '#FFFFFF',
        paper: 'rgba(217,217,217,0.18)',
    },
    text: {
        primary: '#000000',
        secondary: '#666666',
    },
};

const Theme = createTheme({
    palette,
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2rem', fontWeight: 700 },
        h2: { fontSize: '1.5rem', fontWeight: 600 },
        body1: { fontSize: '1rem' },
        button: { textTransform: 'none' },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export default Theme;