import React, { ChangeEvent } from "react";
import "./form-components.scss";

interface FormInputProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    <div className="form">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        required={props.required}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
      />
    </div>
  );
};
