
import React, { FormEvent, useState } from "react";
import agent from "../../../API/agent";
import { FormInput, FormInputUpdate } from "../../../Components/components/formComponents/FormComponents";
import "../../popup.scss";
import { Banori } from "../../../models/banori";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  banori: Banori ;
}

const BanoriPopup: React.FC<Props> = ({ setIsOpen, isOpen, banori }) => {
  const [banor, setBanor] = useState({
    id: banori.id,
    name: banori.name ,
    biografia: banori.biografia ,
    price: banori.price,
    File: new Blob([]),
    age: banori.age,
    RelationshipStatus: banori.RelationshipStatus ,
    profesioni: banori.profesioni,
    pictureUrl: banori.pictureUrl
  });
  // const [editedBanor, setEditedBanor] = useState<Banori | null>(banori);

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer]);
        setBanor((prev) => {
          return { ...prev, File: blob };
        });
      };
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setBanor((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", banori.id.toString());
    formData.append("name", banor.name);
    formData.append("biografia", banor.biografia);
    formData.append("price", banor.price.toString());
    formData.append("File", banor.File);
    formData.append("age", banor.age.toString());
    formData.append("RelationshipStatus",  banor.RelationshipStatus ? 'true' : 'false');
    formData.append("profesioni", banor.profesioni);
    try {
      const result = await agent.Banoret.update(formData, banori.id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
        <h2>Edit Banor</h2>
        <form onSubmit={handleSubmit}>
          <FormInputUpdate
            type="text"
            name="name"
            label="Name"
            placeholder=""
            value={banor.name}
            onChange={handleChange}
          />
          <FormInputUpdate
            type="number"
            name="age"
            label="Age"
            placeholder=""
            value={banor.age}
            onChange={handleChange}
          />
          <FormInputUpdate
            type="checkbox"
            name="relationshipStatus"
            label="Relationship Status"
            placeholder=""
            value={banor.RelationshipStatus}
            onChange={handleChange}
          />
          <FormInputUpdate
            type="text"
            name="biografia"
            label="Biografia"
            placeholder=""
            value={banor.biografia}
            onChange={handleChange}
          />
          <FormInputUpdate
            type="number"
            name="price"
            label="Price"
            placeholder=""
            value={banor.price}
            onChange={handleChange}
          />
          <FormInputUpdate
            type="text"
            name="profesioni"
            label="Profession"
            placeholder=""
            value={banor.profesioni}
            onChange={handleChange}
          />
          <FormInput
            type="file"
            name="File"
            label="Image"
            placeholder=""
            onChange={handleFileInputChange}
          />
          <div className="popup__buttons">
            <button type="submit">Save</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    ): (
      <></>
  );
};

export default BanoriPopup;

