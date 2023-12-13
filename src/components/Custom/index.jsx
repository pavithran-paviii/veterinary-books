import React from "react";
import classNames from "./custom.module.scss";

// <CustomInput title="" placeHolder="" name="" stateValue="" setState=""/>

const CustomInput = ({ title, placeHolder, name, stateValue, setState }) => {
  return (
    <div className={classNames.customInput}>
      <div className={classNames.title}>{title}</div>
      <div className={classNames.inputContainer}>
        <input
          type="text"
          placeholder={placeHolder}
          value={name ? stateValue[name] : stateValue}
          onChange={(event) => {
            if (name) {
              setState((prev) => {
                return { ...prev, [name]: event?.target?.value };
              });
            } else {
              setState(event?.target?.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default CustomInput;

export const CustomButton = ({ image, svg, buttonText, bg, color }) => {
  return (
    <button
      className={classNames.customButton}
      style={{ background: bg ? bg : "", color: color ? color : "" }}
    >
      {image && <img src={image} alt="" />}
      {/* {svg && `<${svg}/>`} */}
      {buttonText}
    </button>
  );
};

export const CustomCheckbox = ({ title, name, stateValue, setState }) => {
  return (
    <div className={classNames.customCheckbox}>
      <div className={classNames.checkboxContainer}>
        <input
          type="checkbox"
          checked={stateValue[name]}
          onChange={(event) => {
            setState((prev) => {
              return { ...prev, [name]: event.target.checked };
            });
          }}
        />
        <label>{title}</label>
      </div>
    </div>
  );
};
