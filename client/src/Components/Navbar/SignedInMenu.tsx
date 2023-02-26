import {  Menu, MenuItem, Button, Fade } from "@mui/material";
import { signOut } from "../../Pages/Account/accountSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import React from "react";
import { clearBasket } from "../BasketComponets/basketSlice";
import { Link, useHistory } from "react-router-dom";

export default function SignedInMenu(props: any) {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
          history.push("/admin");
    };

    return (
        <>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6', color:'var(--blue)' }}
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
                <MenuItem component={Link} to='/orders'>My orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                 
                }}>Logout</MenuItem>
            </Menu>
        </>
        
    );
}


