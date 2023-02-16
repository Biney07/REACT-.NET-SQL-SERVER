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
// import logo from "../../../foto/logo.png";


export default function Sidebar() {

    // const [clicked, setClick] = useState(false)

    // function click() {
    //     setClick(clicked => true)
    // }

    return (
        <>
            <div className="kanvas">
                <nav>

                    <div className="side-logo">
                        <a href="/" style={{color: "white", textDecoration: "none"}}>
                        <RemoveRedEyeTwoToneIcon className="margin"/>B.B.V.Ks ADMIN</a>
                    </div>

                    <ul className="side-list">
                        {/* <li onClick={click} className={clicked ? "active" : " "}><a href="">Gjeneral</a></li> */}
                        {/* <li > */}
                        <NavLink exact to="/admin" className="nav-item"><HomeRepairServiceIcon className="margin"/> Gjeneral</NavLink>
                        <NavLink to="/admin/posts" className="nav-item"><NewspaperIcon className="margin"/>  Postet</NavLink>
                        <NavLink to="/admin/banoret" className="nav-item"><InsertEmoticonIcon className="margin"/>  Banoret</NavLink>
                        <hr className="devider"/>
                        <NavLink to="/admin/settings" className="nav-item"><SettingsIcon className="margin"/>  Settings </NavLink>
                       
                    </ul>
                </nav>
            </div>
        </>
    )
}