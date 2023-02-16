import axios from "axios";
import React, { useEffect, useState } from 'react';
import image from './BackGround.png'
import girl from './1.jpg'
import gif from './9.jpg'
import photo3  from './2.png'
import './Home.css'
import Button from "../../Components/Button/Button";
import { NavLink } from "react-router-dom";
interface Item {
    id: number;
    img: string;
}

const Home: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);
   
  

    return (
        <>
   <img className="background" src={image} ></img>
   <div className="container">
    <h5 className="SubTitle">Ne shtepine me te madhe ne Kosove</h5>
    <h1 className="Title"> Perjeto emocione te pafunda </h1>
     <h1 className="Title"> dhe si kurr me pare afer Vip</h1>
    <p className="paragraf">Vellau i madh</p>
   </div>
   <div className="column">
   <div className="image-container">
    <img className="img"src={girl}></img>

        <img className="img"src={photo3}></img>
        
   </div>
        <div className="image-container">
          <NavLink to={"/Catalog"}><Button title="Voto" buttonType={"green"} style={{width:"500px",marginTop:"30px"}}></Button></NavLink>  
        </div>
        </div>
        </>
    );
}
export default Home