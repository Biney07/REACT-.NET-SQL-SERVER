import React from 'react';
import '../Navbar/Navbar.css'
interface Props {
  title: string;
  buttonType: 'white' | 'green';
    style?: React.CSSProperties;
}

const Button: React.FC<Props> = ({ title, buttonType, style }) => {
  let buttonClass;

  if (buttonType === 'white') {
    buttonClass = 'green';
  } else {
    buttonClass = 'white';
  }

  return (
    <button className={buttonClass} style={style}>
      {title}
    </button>
  );
};

export default Button;
