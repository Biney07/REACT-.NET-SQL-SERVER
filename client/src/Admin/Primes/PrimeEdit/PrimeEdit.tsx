import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { FormInputUpdate } from "../../../Components/components/formComponents/FormComponents";
import { Prime } from "../../../models/prime";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prime: Prime;
}

const PrimeEdit: React.FC<Props> = ({ setIsOpen, isOpen, prime }) => {
  const [editedPrime, setEditedPrime] = useState<Prime>(prime);

  useEffect(() => {
    setEditedPrime(prime);
  }, [prime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedPrime((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await agent.Primes.update(editedPrime, prime.id);
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
            <Close />
          </IconButton>
        </div>
        <h1>Edit Prime</h1>
        <form onSubmit={handleSubmit}>
          <FormInputUpdate
            label="Title"
            name="title"
            type="text"
            placeholder=""
            value={editedPrime.title}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Banoret"
            name="banoret"
            type="text"
            placeholder=""
            value={editedPrime.banoret}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Lojrat"
            name="lojrat"
            type="text"
            placeholder=""
            value={editedPrime.lojrat}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Week"
            name="week"
            type="number"
            placeholder=""
            value={editedPrime.week}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Description"
            name="description"
            type="text"
            placeholder=""
            value={editedPrime.description}
            onChange={handleChange}
          />
          <FormInputUpdate
            label="Video URL"
            name="videoURL"
            type="text"
            placeholder=""
            value={editedPrime.videoURL}
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

export default PrimeEdit;
