import React, { useState } from "react";
import classNames from "./petrecordsform.module.scss";
import CustomInput, { CustomButton, Toastify } from "../Custom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";

const PetRecordsForm = () => {
  const navigate = useNavigate();
  const [petsForm, setPetsForm] = useState({});

  //functions

  function createPetsForm() {
    axios
      .post(BACKENDURL + "/records", petsForm)
      .then((response) => {
        if (response?.data?.status) {
          Toastify(response?.data?.message, "success");
          navigate("/records");
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "Create records response");
      })
      .catch((error) => {
        console.log(error, "Create records error");
        Toastify(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error",
          "error"
        );
      });
  }

  return (
    <div className={classNames.recordsForm}>
      <h3 className={classNames.title}>Add Pet Records</h3>
      <div className={classNames.recordsFields}>
        <CustomInput
          title="Name"
          placeHolder="Enter name..."
          name="name"
          stateValue={petsForm}
          setState={setPetsForm}
        />
        <CustomInput
          title="Age"
          placeHolder="Enter age..."
          name="age"
          stateValue={petsForm}
          setState={setPetsForm}
        />
        <CustomInput
          title="Breed"
          placeHolder="Enter breed..."
          name="breed"
          stateValue={petsForm}
          setState={setPetsForm}
        />
        <CustomInput
          title="Pic"
          placeHolder="Enter Pic..."
          name="pic"
          type="text"
          stateValue={petsForm}
          setState={setPetsForm}
        />
        <CustomButton
          buttonText="Back"
          bg="black"
          color="white"
          func={() => {
            navigate("/records");
          }}
        />
        <CustomButton
          buttonText="Create Pet Record"
          bg="#00638e"
          color="white"
          func={createPetsForm}
        />
      </div>
    </div>
  );
};

export default PetRecordsForm;
