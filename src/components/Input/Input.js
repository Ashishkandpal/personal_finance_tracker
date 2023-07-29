import React from "react";
import classes from "./Input.module.css";

const Input = ({ type, label, state, setState, placeholder }) => {
  return (
    <div className={classes["input-wrapper"]}>
      <p className={classes["label-input"]}>{label}</p>
      <input
        className={classes["custom-input"]}
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
