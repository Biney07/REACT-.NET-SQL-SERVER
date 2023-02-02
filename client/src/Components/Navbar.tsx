import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Badge } from "@mui/material";
import React from "react";
import {Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../Store/hook";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import SignedInMenu from "./SignedInMenu";
import { ShoppingCart } from "@mui/icons-material";
// import { ReactDOM } from "react";
// import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";


const pages = [
    { name: 'Home', route: '/' },
    { name: 'Orders', route: '/Order' },
    { name: 'Catalog', route: '/Catalog' }
];



export default function Navbar() {
    const { user } = useAppSelector(state => state.account);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {basket} = useStoreContext();
    // const {basket} = useAppSelector(state => state.basket);
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

        <AppBar position="static">

            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontStyle: 'inherit',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',

                        }}
                    >
                        Dasma Jone
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
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
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Dasma jone
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                sx={{ color: 'white' }}>
                                <NavLink style={{ color: 'white' }} to={page.route}>{page.name}</NavLink>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', flexGrow: 0, alignItems: 'center' }}>
                    <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                        {
                            user ? (
                                <SignedInMenu />) : (
                                <div>
                                    <NavLink style={{ color: 'white', marginLeft: "10px" }} to='/Login'>Login</NavLink>
                                    <NavLink style={{ color: 'white', marginLeft: "10px" }} to='/Register'>Register</NavLink>
                                </div>
                            )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

