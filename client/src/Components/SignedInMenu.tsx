import {  Menu, MenuItem, Button, Fade } from "@mui/material";
import { signOut } from "../Pages/Account/accountSlice";
import { useAppDispatch, useAppSelector } from "../Store/hook";
import React from "react";

export default function SignedInMenu(props: any) {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6' }}
            >
                {user?.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                 
                }}>Logout</MenuItem>
            </Menu>
        </>
        
    );
}

