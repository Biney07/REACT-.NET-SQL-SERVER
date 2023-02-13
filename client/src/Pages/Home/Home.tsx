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
    <h5 className="SubTitle">Be the one who will change the world 😎🤘</h5>
    <h1 className="Title"> Arti eshte genjeshtra </h1>
     <h1 className="Title"> qe na lejon te kuptojme boten</h1>
    <p className="paragraf">Pablo Picasso</p>
   </div>
   <div className="column">
   <div className="image-container">
    <img className="img"src={girl}></img>
      <img className="img"src={gif}></img>
        <img className="img"src={photo3}></img>
        
   </div>
        <div className="image-container">
          <NavLink to={"/Register"}><Button title="Register now" buttonType={"green"} style={{width:"500px",marginTop:"30px"}}></Button></NavLink>  
        </div>
        </div>
        </>
    );
}
export default Home