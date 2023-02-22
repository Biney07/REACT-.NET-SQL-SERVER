import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Badge } from "@mui/material";
import React from "react";
import {Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../Store/hook";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import SignedInMenu from "./SignedInMenu";
import { Mail, ShoppingCart } from "@mui/icons-material";
import logo from "./logo.png"
import './Navbar.css'
const pages = [
    { name: 'Home', route: '/' },
    { name: 'Votat', route: '/Order' },
    { name: 'Voto', route: '/Catalog' },
       { name: 'Prime', route: '/Prime' },
        
             { name: 'Fan Page', route: '/Posts' },
              { name: 'Momentet', route: '/Momentet' },
];



export default function Navbar() {
    const { user } = useAppSelector(state => state.account);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {basket} = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (

        <AppBar className="navbar" position="static">

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img className="logo" src={logo}></img>
                    <h1 className="title">
                        Big Brother Vip
                    </h1>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                       
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <NavLink to={page.route}>{page.name}</NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    
                   
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                sx={{ color: 'white' }}>
                                <NavLink className="nav-link" activeClassName=" " to={page.route}>{page.name}</NavLink>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', flexGrow: 0, alignItems: 'center' }}>
                    <IconButton component={Link} to='/basket' size='large' >
                        <Badge className="blue" badgeContent={itemCount} color='secondary'>
                            <Mail />
                        </Badge>
                    </IconButton>
                        {
                            user ? (
                                <SignedInMenu />) : (
                                <div>
                                    <NavLink className="green" to='/Login'>Login</NavLink>
                                    <NavLink className="green" to='/Register'>Register</NavLink>
                                </div>
                            )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

