
import React, { FormEvent, FormEventHandler, useState } from "react";
import agent from "../../../API/agent";
import { FormInput } from "../../../Components/components/formComponents/FormComponents";
import "../../popup.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBanori: React.FC<Props> = ({ setIsOpen, isOpen }) => {

  const [banor, setBanor] = useState({
    name: "",
    biografia: "",
    price: 100,
    File: new Blob([]),
    age: 0,
    relationshipStatus: false,
    profesioni: "",
  });

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
    formData.append("name", banor.name);
    formData.append("biografia", banor.biografia);
    formData.append("price", banor.price.toString());
    formData.append("File", banor.File);
    formData.append("age", banor.age.toString());
    formData.append("relationshipStatus",  banor.relationshipStatus ? 'true' : 'false');
    formData.append("profesioni", banor.profesioni);
    try {
      const result = await agent.Banoret.create(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return isOpen ? (
    <div className="popup">
       <div className="popup__inner">
         <button className="popup__close-button" onClick={handleClose}>
           X
         </button>
     <h1>Shto banoriun</h1>
    <form onSubmit={handleSubmit} className="popup__form" asp-action="Create" encType="multipart/form-data">
      <FormInput
        label="Name"
        name="name"
        type="text"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="Biografia"
        name="biografia"
        type="text"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="Price"
        name="price"
        type="number"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="File"
        name="File"
        type="file"
        placeholder=""
        onChange={handleFileInputChange}
      />
      <FormInput
        label="Age"
        name="age"
        type="number"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="Relationship Status"
        name="relationshipStatus"
        type="checkbox"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="Profesioni"
        name="profesioni"
        type="text"
        placeholder=""
        onChange={handleChange}
        
      />
      <button type="submit">Create Banor</button>
    </form>

    </div>
    </div>
    ): (
          <></>
    );
};

export default CreateBanori;
