import { CircularProgress } from "@mui/material";
import React, { FormEvent, useState } from "react";
import agent from "../../../API/agent";
import { FormInput } from "../../../Components/components/formComponents/FormComponents";
import { Sponzor } from "../../../models/sponzor";
import "../../popup.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSponzor: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [sponzor, setSponzor] = useState({
    name: "",
    email: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    notes: "",
    File: new Blob([]),
  });
  const [loading, setLoading] = useState(false);

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
        setSponzor((prev) => {
          return { ...prev, File: blob };
        });
      };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSponzor((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", sponzor.name);
    formData.append("email", sponzor.email);
    formData.append("startDate", sponzor.startDate);
    formData.append("endDate", sponzor.endDate);
    formData.append("notes", sponzor.notes);
    formData.append("File", sponzor.File);
    
    try {
      const result = await agent.Sponzors.create(formData);
      console.log(result);
      window.location.reload()
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
     <h1>Shto Sponzorin</h1>
    <form onSubmit={handleSubmit} className="popup__form" asp-action="Create" encType="multipart/form-data">
      <FormInput
        label="Name"
        name="name"
        type="text"
        placeholder=""
        onChange={handleChange}    
      />
      <FormInput
        label="email"
        name="email"
        type="text"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="startDate"
        name="startDate"
        type="date"
        placeholder=""
        onChange={handleChange}
        
      />
      <FormInput
        label="endDate"
        name="endDate"
        type="date"
        placeholder=""
        onChange={handleFileInputChange}
      />
      <FormInput
        label="notes"
        name="notes"
        type="text"
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
      <button className='ButtonAdmin' type="submit" disabled={loading} >{loading ? <CircularProgress size={24} /> : 'Create Sponzori'}</button>
    </form>

    </div>
    </div>
    ): (
          <></>
    );
};

export default CreateSponzor;
