import React, { FormEvent, useState } from "react";
import agent from "../../../API/agent";
import { FormInput, FormInputUpdate } from "../../../Components/components/formComponents/FormComponents";
import { Sponzor } from "../../../models/sponzor";
import "../../popup.scss";

interface Props {
  sponzor: Sponzor;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SponzorEdit: React.FC<Props> = ({ sponzor, setIsOpen, isOpen }) => {
  const [updatedSponzor, setUpdatedSponzor] = useState({
    id: sponzor.id,
    name: sponzor.name,
    email: sponzor.email,
    startDate: sponzor.startDate,
    endDate: sponzor.endDate,
    notes: sponzor.notes,
    File: new Blob([]),
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
        setUpdatedSponzor((prev) => {
          return { ...prev, File: blob };
        });
      };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = 
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUpdatedSponzor((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", sponzor.id.toString());
    formData.append("name", updatedSponzor.name);
    formData.append("email", updatedSponzor.email);
    formData.append("startDate", updatedSponzor.startDate);
    formData.append("endDate", updatedSponzor.endDate);
    formData.append("notes", updatedSponzor.notes);
    formData.append("File", updatedSponzor.File);

    try {
      const result = await agent.Sponzors.update(formData, sponzor.id);
      console.log(result);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
        <h2>Edit Sponzor</h2>
        <form onSubmit={handleSubmit}>
          <FormInputUpdate
            type="text"
            name="name"
            label="Name"
            placeholder=""
            value={updatedSponzor.name}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="email"
            name="email"
            type="text"
            placeholder=""
            value={updatedSponzor.email}
            onChange={handleChange}

          />
          <FormInputUpdate
            label="startDate"
            name="startDate"
            type="date"
            placeholder=""
            value={updatedSponzor.startDate}
            onChange={handleChange}

          />
          <FormInputUpdate
            label="endDate"
            name="endDate"
            type="date"
            placeholder=""
            value={updatedSponzor.endDate}
            onChange={handleFileInputChange}
          />
          <FormInputUpdate
            label="notes"
            name="notes"
            type="text"
            placeholder=""
            value={updatedSponzor.notes}
            onChange={handleChange}

          />
          <FormInput
            label="File"
            name="File"
            type="file"
            placeholder=""
            onChange={handleFileInputChange}

          />
          <div className="popup__buttons">
            <button className="ButtonAdmin" type="submit">Save</button>
            <button className="ButtonAdmin" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SponzorEdit;

