import React, { useState } from "react"
import {
    NavLink,
  } from "react-router-dom";
import "./Sidebar.css"
import logo from "../../../foto/logo.png";


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
                        <a href="/" style={{color: "white", textDecoration: "none"}}><img src={logo} alt="" />
                        Martesa Jonë</a>
                    </div>

                    <ul className="side-list">
                        {/* <li onClick={click} className={clicked ? "active" : " "}><a href="">Gjeneral</a></li> */}
                        {/* <li > */}
                        <NavLink to="/admin/gjeneral" className="nav-item"><span className="material-icons">menu</span>Gjeneral</NavLink>
                        <NavLink to="/admin/kengetaret" className="nav-item"><span className="material-icons">music_note</span>Kengetaret</NavLink>
                        <NavLink to="/admin/resturante" className="nav-item"><span className="material-icons">restaurant</span>Resturante</NavLink>
                        <NavLink to="/admin/sallon" className="nav-item"><span className="material-icons">auto_awesome</span>Sallon Bukurie</NavLink>
                        <NavLink to="/admin/garderob" className="nav-item"><span className="material-icons">checkroom</span>Garderoba</NavLink>
                        <NavLink to="/admin/userat" className="nav-item"><span className="material-icons">person</span>Userat</NavLink>
                        <hr className="devider"/>
                        <NavLink to="/admin/settings" className="nav-item"><span className="material-icons">settings</span>Settings </NavLink>
                       
                        {/* Gjeneral
Kengetar
Resturante
Sallon Bukurie
Garderoba
Userat
Settings */}
                        {/* <li ><a href="">Restaurante</a></li>
                        <li ><a href="">Sallon Bukurie</a></li>
                        <li ><a href="">Garderoba</a></li>
                        <li ><a href="">Userat</a></li>
                        <li ><a href="">Kompanite</a></li>
                        <li ><a href="">Settings</a></li> */}
                    </ul>
                </nav>
            </div>
        </>
    )
}