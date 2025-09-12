import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {useTheme} from '@mui/material/styles';
import logo from '../../assets/logo-daily.webp';
import {Link} from 'react-router';
import SettingsIcon from "@mui/icons-material/Settings";

const HeaderPlayer: React.FC = () => {
    const theme = useTheme();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 'none' }}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Button
                    component={Link}
                    to={"/2"}
                    variant="contained"
                    sx={{
                        backgroundColor: '#FFF8E1',
                        color: theme.palette.primary.main,
                        borderRadius: '16px',
                        fontWeight: 'bold',
                        px: 3,
                        textTransform: 'none',
                        marginLeft: 5,
                        letterSpacing: 1,
                        fontSize: 17
                    }}
                >
                    DAILYFOOT
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        component={Link}
                        to="/2/agenda"
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            borderRadius: '16px 0 0 16px',
                            borderRight: '0',
                            px: 5,
                            height: 60,
                            paddingRight: 30,
                            fontSize: 17,
                            "&:hover": {
                                backgroundColor: 'orange',
                                color: 'white',
                                transition: "all 0.5s ease"
                            }
                        }}
                    >
                        Mon Agenda
                    </Button>

                    <Box
                        component={Link}
                        to={"/2"}
                        sx={{
                            width: 140,
                            height: 140,
                            border: `5px dashed ${theme.palette.primary.main}`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                            marginLeft: '-3px',
                            marginRight: '-3px',
                            backgroundColor: theme.palette.background.paper,
                            borderRight: 0,
                            borderLeft: 0,
                            "&:hover": {
                                backgroundColor: 'orange',
                                color: 'white',
                                transition: "all 0.5s ease"
                            }

                        }}
                    >

                        <Box
                            component="img"
                            src={logo}
                            alt="Logo"
                            sx={{

                                height: 100,
                                width: 100,

                            }}
                        />
                    </Box>

                    <Button
                        component={Link}
                        to={`/2/statistic`}
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            borderRadius: '0 16px 16px 0',
                            borderLeft: '0',
                            px: 5,
                            height: 60,
                            paddingLeft: 30,
                            fontSize: 17,
                            "&:hover": {
                                backgroundColor: 'orange',
                                color: 'white',
                                transition: "all 0.5s ease"
                            }
                        }}
                    >
                        Statistiques
                    </Button>
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        component={Link}
                        to="/1/setting"
                        sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                        }}
                    >
                        <SettingsIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>

                    <IconButton
                        component={Link}
                        to="/Login"
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                        }}
                    >
                        <PowerSettingsNewIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderPlayer;