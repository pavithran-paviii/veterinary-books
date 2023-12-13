import React, { useState } from "react";
import classNames from "./custom.module.scss";

//assets
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const CustomInput = ({
  title,
  placeHolder,
  name,
  type,
  stateValue,
  setState,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className={classNames.customInput}>
      <div className={classNames.title}>{title}</div>
      <div className={classNames.inputContainer}>
        <input
          type={passwordVisible ? "text" : type ? type : "text"}
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
        {type === "password" && passwordVisible ? (
          <IoIosEye onClick={() => setPasswordVisible((prev) => !prev)} />
        ) : type === "password" && !passwordVisible ? (
          <IoIosEyeOff onClick={() => setPasswordVisible((prev) => !prev)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CustomInput;

export const CustomButton = ({ image, svg, buttonText, func, bg, color }) => {
  return (
    <button
      className={classNames.customButton}
      style={{ background: bg ? bg : "", color: color ? color : "" }}
      onClick={func}
    >
      {image && <img src={image} alt="" />}
      {svg && svg}
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
