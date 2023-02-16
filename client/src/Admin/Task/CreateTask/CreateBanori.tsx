import React, { useState } from "react";
import agent from "../../../API/agent";
import { FormInput } from "../../../Components/components/formComponents/FormComponents";
// import { Banori } from "../../../models/banori";
import "../../popup.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBanori: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [banori, setBanori] = useState({
    name: "",
    biografia: "",
    price: 100,
    pictureUrl: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1",
    RelationshipStatus: "True",
    profesioni: "",
    age: 0,
  });

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setBanori((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    agent.Banoret.create(banori)
      .then((banori) => setBanori(banori))
      .catch(function (error) {
        console.log(error.response.data);
      });
    // window.location.reload();
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
        <button className="popup__close-button" onClick={handleClose}>
          X
        </button>
        <h1>Shto banoriun</h1>
        <form className="popup__form" onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <FormInput
            label="Biography"
            type="text"
            name="biografia"
            placeholder="biography"
            onChange={handleChange}
          />
          <FormInput
            label="Price"
            type="number"
            name="price"
            placeholder="price"
            onChange={handleChange}
          />
          <FormInput
            label="Picture Url"
            type="text"
            name="pictureUrl"
            placeholder="picture url"
            onChange={handleChange}
          />
          <FormInput
            label="Relationship Status"
            type="text"
            name="RelationshipStatus"
            placeholder="relationship status"
            onChange={handleChange}
            />
          <FormInput
            label="Profession"
            type="text"
            name="profesioni"
            placeholder="profession"
            onChange={handleChange}
            />
          <FormInput
            label="Age"
            type="number"
            name="age"
            placeholder="age"
            onChange={handleChange}
          />
          <button type="submit">Shtot banorin</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CreateBanori;
