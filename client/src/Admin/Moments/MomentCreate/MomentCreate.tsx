import React, { useState } from "react";
import agent from "../../../API/agent";
import { FormInput } from "../../../Components/components/formComponents/FormComponents";
import { Moment } from "../../../models/moment";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MomentCreate: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [moment, setMoment] = useState<Moment>({
    id: 0,
    title: "",
    description: "",
    videoURL: "",
    date: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setMoment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await agent.Moments.create(moment);
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
          <button type="submit">Create Moment</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MomentCreate;
