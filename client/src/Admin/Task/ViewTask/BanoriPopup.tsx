import React, { useState } from "react";
import "./TaskPop.scss";
import "../../../assets/style/toggle-switch.css";
import agent from "../../../API/agent";
import { Banori } from "../../../models/banori";

type BanoriPopupProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  banori: Banori;
}

const BanoriPopup: React.FC<BanoriPopupProps> = ({ isOpen, setIsOpen, banori }) => {
  const [name, setName] = useState(banori.name);
  const [biografia, setBiografia] = useState(banori.biografia);
  const [price, setPrice] = useState(banori.price);
  const [pictureUrl, setPictureUrl] = useState(banori.pictureUrl);
  const [RelationshipStatus, setRelationshipStatus] = useState(banori.RelationshipStatus);
  const [profesioni, setProfesioni] = useState(banori.profesioni);
  const [age, setAge] = useState(banori.age);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const updatedBanori = {
      ...banori,
      name: name,
      biografia: biografia,
      price: price,
      pictureUrl: pictureUrl,
      RelationshipStatus: RelationshipStatus,
      profesioni: profesioni,
      age: age
    };
    // agent.Banoret.update(updatedBanori, banori.id);
    setIsOpen(false);
    window.location.reload();
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
        <button className="popup__close-button" onClick={handleClose}>
          X
        </button>
        <form className="popup__form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Biografia:
            <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
          </label>
          <label>
            Picture URL:
            <input type="text" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
          </label>
          <label>
            Relationship Status:
            <select value={RelationshipStatus} onChange={(e) => setRelationshipStatus(e.target.value)}>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </label>
          <label>
            Profesioni:
            <input type="text" value={profesioni} onChange={(e) => setProfesioni(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BanoriPopup;
