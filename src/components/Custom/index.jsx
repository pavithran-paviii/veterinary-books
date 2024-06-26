import React, { useEffect, useRef, useState } from "react";
import classNames from "./custom.module.scss";

import { toast } from "react-toastify";

//assets
import {
  IoIosEye,
  IoIosEyeOff,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

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

export const CustomButton = ({
  image,
  svg,
  buttonText,
  func,
  bg,
  color,
  loading,
}) => {
  return (
    <button
      className={classNames.customButton}
      style={{
        background: bg ? bg : "",
        color: color ? color : "",
        pointerEvents: loading ? "none" : "",
        opacity: loading ? "0.5" : "1",
      }}
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

export const CustomDropdown = ({
  title,
  dropdown,
  name,
  stateValue,
  setState,
  topTitle,
  type,
  stateVal,
  mapVal,
  editable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef?.current?.contains(event?.target) &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Perform any additional actions based on the selected option
  };

  useEffect(() => {
    if (!editable && name && stateValue[name]) {
      setSelectedOption(stateValue[name]);
    } else if (!editable && stateValue && typeof stateValue !== "object") {
      setSelectedOption(stateValue);
    }
  }, [stateValue]);

  return (
    <div
      className={classNames.eachCustomDropdown}
      style={{
        // minWidth: isOpen ? "250px" : "",
        zIndex: isOpen ? "3" : "",
        height: topTitle ? "5.2rem" : "3rem",
      }}
    >
      {topTitle && <div className={classNames.topTitle}>{title}</div>}
      <div
        className={classNames.inputContainer}
        onClick={toggleDropdown}
        style={{
          pointerEvents: dropdown ? "" : "none",
          top: topTitle ? "2rem" : "",
          maxHeight: isOpen ? "400px" : "100%",
          borderBottom: "",
        }}
        ref={dropdownRef}
      >
        <span>
          <span style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {name && stateValue?.Icon ? (
              <img
                src={stateValue?.Icon}
                alt={stateValue?.NameOfTeam}
                style={{ height: "1.25rem" }}
              />
            ) : (
              ""
            )}
            {selectedOption
              ? selectedOption
              : title
              ? title
              : dropdown[0]?.NameOfTeam}
          </span>
          <span>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
        </span>
        {isOpen && (
          <ul className="dropdown-list">
            {dropdown?.length > 3 && isOpen && (
              <li
                style={{
                  display: dropdown?.length <= 3 ? "none" : "",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search.."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                />
              </li>
            )}
            {type === "obj2Names" && dropdown?.length > 0
              ? dropdown
                  ?.filter((row) => {
                    // Convert the row object values to an array and check if any value matches the search query
                    const values = Object?.values(row);
                    const searchQueryy = searchQuery?.toLowerCase(); // Convert the search query to lowercase for a case-insensitive search

                    return values?.some((value) => {
                      if (typeof value === "string") {
                        return value?.toLowerCase()?.includes(searchQueryy);
                      }
                      return false;
                    });
                  })
                  ?.map((eachitem, index) => {
                    return (
                      <li
                        onClick={(event) => {
                          event.stopPropagation();
                          selectOption(
                            eachitem[mapVal?.name] +
                              " (" +
                              eachitem[mapVal?.name1] +
                              ")"
                          );
                          setState({
                            ...stateValue,
                            [name]: eachitem[stateVal],
                          });
                        }}
                        key={eachitem[mapVal?.name] + index}
                      >
                        {eachitem[mapVal?.name] +
                          " (" +
                          eachitem[mapVal?.name1] +
                          ")"}
                      </li>
                    );
                  })
              : type === "obj" && dropdown?.length > 0
              ? dropdown
                  ?.filter((row) => {
                    // Convert the row object values to an array and check if any value matches the search query
                    const searchQueryy = searchQuery?.toLowerCase(); // Convert the search query to lowercase for a case-insensitive search
                    return row?.toLowerCase()?.includes(searchQueryy);
                  })
                  ?.map((eachitem, index) => {
                    return (
                      <li
                        onClick={(event) => {
                          event.stopPropagation();
                          selectOption(eachitem[mapVal?.name]);
                          setState({
                            ...stateValue,
                            [name]: eachitem[stateVal],
                          });
                        }}
                        key={eachitem[mapVal?.name] + index}
                      >
                        {eachitem[mapVal?.name]}
                      </li>
                    );
                  })
              : title === "All Countries"
              ? dropdown?.length > 0 &&
                dropdown
                  ?.filter((row) => {
                    // Convert the row object values to an array and check if any value matches the search query
                    const searchQueryy = searchQuery?.toLowerCase(); // Convert the search query to lowercase for a case-insensitive search
                    return row?.toLowerCase()?.includes(searchQueryy);
                  })
                  ?.map((eachitem, index) => {
                    return (
                      <li
                        onClick={(event) => {
                          event.stopPropagation();
                          selectOption(eachitem);
                          setState(eachitem);
                        }}
                        key={eachitem + index}
                        style={{
                          display: eachitem === stateValue ? "none" : "",
                        }}
                      >
                        {eachitem}
                      </li>
                    );
                  })
              : (name === "Gender" ||
                  name === "groupType" ||
                  type === "single") &&
                dropdown?.length > 0
              ? dropdown?.map((eachitem, index) => {
                  return (
                    <li
                      onClick={(event) => {
                        event.stopPropagation();
                        selectOption(eachitem);
                        setState({
                          ...stateValue,
                          [name]: eachitem,
                        });
                      }}
                      key={eachitem + index}
                    >
                      {eachitem}
                    </li>
                  );
                })
              : dropdown?.length > 0 &&
                dropdown?.map((eachitem, index) => {
                  return (
                    <li
                      onClick={(event) => {
                        event.stopPropagation();
                        selectOption(eachitem?.NameOfTeam);
                        if (name === "teamUsername") {
                          setState((prev) => {
                            return { ...prev, [name]: eachitem?.TeamUsername };
                          });
                        } else {
                          setState({
                            ...stateValue,
                            [name]: {
                              NameOfTeam: eachitem?.NameOfTeam,
                              Icon: eachitem?.Icon,
                            },
                          });
                        }
                      }}
                      key={eachitem?.NameOfTeam + index}
                    >
                      <img src={eachitem?.Icon} alt={eachitem?.NameOfTeam} />
                      {eachitem?.NameOfTeam}
                    </li>
                  );
                })}
          </ul>
        )}
      </div>
    </div>
  );
};

export function Toastify(message, type) {
  toast(message, type);
}

export const EachCustomDatePicker = ({
  title,
  placeholder,
  name,
  stateValue,
  setState,
  mandatory,
}) => {
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (datepickerRef.current) {
      const options = {
        enableTime: true,
        // Other options here
        dateFormat: "Y-m-dTH:i:S\\Z",
        time_24hr: true,
        utc: true,
        onChange: function (selectedDates, dateStr, instance) {
          console.log(
            instance.selectedDates[0].toISOString(),
            "selected datee"
          );
          if (name) {
            setState((prev) => {
              return {
                ...prev,
                [name]: instance.selectedDates[0].toISOString(),
              };
            });
          } else {
            setState(dateStr);
          }
        },
      };

      flatpickr(datepickerRef.current, options);
    }
  }, []);

  return (
    <div className={classNames.eachInputDatePicker}>
      <div className={classNames.title}>{title}</div>
      <input
        type="text"
        id="datepicker"
        ref={datepickerRef}
        className={classNames.inputContainer}
        placeholder={placeholder}
        name={name}
        value={name ? stateValue[name] : stateValue ? stateValue : ""}
        // onChange={(event) => {
        //   setState({ ...stateValue, [name]: event?.target?.value });
        // }}
      />
    </div>
  );
};

export const CustomSelectOne = ({
  stateValue,
  setState,
  allOptions,
  name,
  title,
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (name && stateValue[name]) {
      setSelected(stateValue[name]);
    } else if (stateValue) {
      setSelected(stateValue);
    }
  }, [stateValue]);

  return (
    <div className={classNames.customSelectOne}>
      <div className={classNames.title}>{title}</div>
      <div className={classNames.allOptions}>
        {allOptions?.map((eachItem, index) => {
          return (
            <div
              className={`${classNames.eachOption} ${
                eachItem?.value
                  ? eachItem?.value
                  : eachItem?.name === selected
                  ? classNames.selectedOption
                  : ""
              }`}
              onClick={() => {
                setSelected(eachItem?.value ? eachItem?.value : eachItem?.name);
                if (name) {
                  setState((prev) => {
                    return {
                      ...prev,
                      [name]: eachItem?.value
                        ? eachItem?.value
                        : eachItem?.name,
                    };
                  });
                } else {
                  setState(eachItem?.value ? eachItem?.value : eachItem?.name);
                }
              }}
            >
              {eachItem?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CustomTextarea = ({
  title,
  placeHolder,
  name,
  type,
  stateValue,
  setState,
}) => {
  return (
    <div className={classNames.customTextarea}>
      <div className={classNames.title}>{title}</div>
      <div className={classNames.inputContainer}>
        <textarea
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
