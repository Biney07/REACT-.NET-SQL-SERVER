import React, { useState } from "react";
import "./TaskCard.scss";
import BanoriPopup from "../ViewTask/BanoriPopup";

interface BanoriCardProps {
  banoriId: number;
  relationShip: string;
  age: number;
  name: string;
  img: string;
  price: number;
  prof: string;
}

const BanoriCard: React.FC<BanoriCardProps> = ({ banoriId, relationShip, age, name, img, price, prof }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  return (
    // <div className="cardT row">

    //   <BanoriPopup isOpen={showPopup} setIsOpen={setShowPopup} banori={{ relationShip,age,name,img,price,prof }} />


    //   <div className="main-text column">
    //     <p className="cardT-id">ID: {banoriID}</p>
    //     <p className="cardT-id">caseID: {CaseId}</p>
    //     <div className="row">
    //       <h1 className="cardT-title">{title}</h1>

    //       {statusi ? <h1 className="cardT-status done">Done</h1>
    //         : <h1 className="cardT-status">Doing</h1>}

    //     </div>
    //     <p className="cardT-details">{details}</p>
    //     <p className="cardT-date">Created: {dateCreated}</p>
    //   </div>

    //   <div className="cardT-extra column">
    //     <div className="center">
    //       <h3 className="cardT-due">DUE: {dueDate}</h3>
    //     </div>
    //     <div className="cardT-button">
    //       <button className="button" onClick={handleShowPopup} >SHIKO</button>
    //     </div>
    //   </div>


    // </div>
    <div></div>
  );
};

export default BanoriCard;