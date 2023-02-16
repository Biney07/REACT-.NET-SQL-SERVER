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

interface FormInputUpdateProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  value:any;
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


export const FormInputUpdate: React.FC<FormInputUpdateProps> = (props) => {
  return (
    <div className="form">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        required={props.required}
        name={props.name}
        placeholder={props.placeholder}
        value ={props.value}
        type={props.type}
        onChange={props.onChange}
      />
    </div>
  );
};
