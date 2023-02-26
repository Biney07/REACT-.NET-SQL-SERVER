import React, { useState } from "react"
import {
    NavLink,
  } from "react-router-dom";
import "./Sidebar.css"
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
// import logo from "../../../foto/logo.png";


export default function Sidebar() {


    return (
        <>
            <div className="kanvas">
                <nav>

                    <div className="side-logo" style={{marginTop:'35px'}} >
                        <a href="/" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins" }}>
      <SupervisedUserCircleIcon style={{ fontSize: "40px", marginRight: "10px" }} />
      <h1 style={{ fontSize: "28px", margin: "0" }}>Vëllau i madh</h1>
    </a>
                    </div>

                    <ul className="side-list">
                        <NavLink exact to="/admin" className="nav-item"><HomeRepairServiceIcon className="margin"/> Gjeneral</NavLink>
                        <NavLink to="/admin/posts" className="nav-item"><NewspaperIcon className="margin"/>  Postet</NavLink>
                        <NavLink to="/admin/banoret" className="nav-item"><InsertEmoticonIcon className="margin"/>  Banoret</NavLink>
                        <NavLink to="/admin/moments" className="nav-item"><OndemandVideoIcon className="margin"/>  Momentet</NavLink>
                        <NavLink to="/admin/sponzors" className="nav-item"><PaidIcon className="margin"/>  Sponzoret</NavLink>

                        <hr className="devider"/>
                        <NavLink to="/admin/settings" className="nav-item"><SettingsIcon className="margin"/>  Settings </NavLink>
                          <NavLink to="/Home" className="nav-item"><HomeIcon className="margin"/>  Home </NavLink>
                    </ul>
                </nav>
            </div>
        </>
    )
}