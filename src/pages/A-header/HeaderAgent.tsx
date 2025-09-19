import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, MenuItem, Menu } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/logo-daily.webp';
import {Link, useNavigate} from 'react-router';
import {toast} from "react-toastify";
import MenuIcon from '@mui/icons-material/Menu';

const HeaderAgent: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info(`À bientôt !`);
        navigate('/login');
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 'none' }}>
            <Toolbar sx={{display: 'flex', alignItems: 'center',justifyContent: 'center',gap: '16px' }}>

                <Box sx={{ display: 'flex', alignItems:'center',justifyContent:{xs:"start",md:'center'},flexGrow:{xs:0,md:1} ,pl:{xs:0,md:17} }}>
                    <Button
                        component={Link}
                        to="/agent/agenda"
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            borderRadius: '16px 0 0 16px',
                            borderRight: '0',
                            px: 5,
                            height:{xs:30,md:60},
                            paddingRight: {xs:3,md:23},
                            fontSize: {xs:11,md:17},
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
                        to={"/"}
                        sx={{
                            width: {xs:70,md:140},
                            height: {xs:70,md:140},
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

                                height: {xs:50,md:100},
                                width: {xs:50,md:100},

                            }}
                        />
                    </Box>

                    <Button
                        component={Link}
                        to="/agent/players"
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            borderRadius: '0 16px 16px 0',
                            borderLeft: '0',
                            px: 5,
                            height:{xs:30,md:60},
                            paddingLeft: {xs:5,md:30},
                            fontSize: {xs:11,md:17},
                            "&:hover": {
                                backgroundColor: 'orange',
                                color: 'white',
                                transition: "all 0.5s ease"
                            }
                        }}
                    >
                        Joueurs
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <IconButton
                            component={Link}
                            to="/agent/setting"
                            sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '50%',
                                width: 50,
                                height:50,
                            }}
                        >
                            <SettingsIcon sx={{ color: theme.palette.text.primary }} />
                        </IconButton>

                        <IconButton
                            onClick={handleLogout}
                            sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '50%',
                                width: {xs:5,md:50},
                                height: {xs:5,md:50},
                            }}
                        >
                            <PowerSettingsNewIcon sx={{ color: theme.palette.text.primary }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={handleMenuClick} sx={{ backgroundColor: '#FFFFFF' }}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            disableScrollLock
                        >
                            <MenuItem
                                component={Link}
                                to="/agent/setting"
                                onClick={handleClose}
                            >
                                <SettingsIcon sx={{ mr: 1 }} /> Paramètres
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handleLogout();
                                }}
                            >
                                <PowerSettingsNewIcon sx={{ mr: 1 }} /> Déconnexion
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default HeaderAgent;
