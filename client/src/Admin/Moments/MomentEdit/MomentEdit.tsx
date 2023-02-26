import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { FormInputUpdate } from "../../../Components/components/formComponents/FormComponents";
import { Moment } from "../../../models/moment";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moment: Moment;
}

const MomentEdit: React.FC<Props> = ({ setIsOpen, isOpen, moment }) => {
  const [editedMoment, setEditedMoment] = useState<Moment>(moment);

  useEffect(() => {
    setEditedMoment(moment);
  }, [moment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedMoment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await agent.Moments.update(editedMoment,moment.id);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
     <div className="popup__close-button-wrapper">
      <IconButton className="RedCloseButton" onClick={handleClose}>
        <Close  />
      </IconButton>
    </div>
        <h1>Edit Moment</h1>
        <form onSubmit={handleSubmit}>
          <FormInputUpdate
            label="Title"
            name="title"
            type="text"
            placeholder=""
            value={editedMoment.title}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Description"
            name="description"
            type="text"
            placeholder=""
            value={editedMoment.description}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Video URL"
            name="videoURL"
            type="text"
            placeholder=""
            value={editedMoment.videoURL}
            onChange={handleChange}
          />
          <button className="ButtonAdmin" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MomentEdit;
