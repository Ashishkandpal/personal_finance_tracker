import React from "react";
import classes from "./Button.module.css";

const Button = ({ text, onClick, outlined, disabled }) => {
  console.log(outlined);
  return (
    <div
      className={`${classes.btn} ${outlined ? classes["btn-outlined"] : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

export default Button;
