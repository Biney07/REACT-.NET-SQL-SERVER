import React, { useState } from "react";
import agent from "../../../API/agent";
import { FormInput } from "../../../Components/components/formComponents/FormComponents";
import { Prime } from "../../../models/prime";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrimeCreate: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [prime, setPrime] = useState<Prime>({
    id: 0,
    week:0,
    lojrat:"",
    banoret:"",
    title: "",
    description: "",
    videoURL: "",
    date: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPrime((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await agent.Primes.create(prime);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
        <button className="popup__close-button" onClick={handleClose}>
          X
        </button>
        <h1>Shto banoriun</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Title"
            name="title"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
           <FormInput
            label="Banoret"
            name="banoret"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
           <FormInput
            label="Lojrat"
            name="lojrat"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
           <FormInput
            label="Week"
            name="week"
            type="number"
            placeholder=""
            onChange={handleChange}
          />
          <FormInput
            label="Description"
            name="description"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
          <FormInput
            label="Video URL"
            name="videoURL"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
          <button type="submit">Create Prime</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PrimeCreate;
