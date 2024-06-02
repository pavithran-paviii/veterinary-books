import React, { useContext, useState } from "react";
import classNames from "./clientform.module.scss";
import CustomInput, { CustomButton, Toastify } from "../Custom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";

const ClientForm = () => {
  const navigate = useNavigate();
  const { email, token } = useContext(GlobalContext);
  const [clientForm, setClientForm] = useState({});

  //functions

  function createClientForm() {
    clientForm.refMail = email;
    console.log(`Bearer ${token}`, "Token is there!");
    axios
      .post(BACKENDURL + "/client", clientForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.status) {
          Toastify(response?.data?.message, "success");
          navigate("/clients");
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "Create client response");
      })
      .catch((error) => {
        console.log(error, "Create client error");
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
    <div className={classNames.clientForm}>
      <h3 className={classNames.title}>Add Client</h3>
      <div className={classNames.clientFields}>
        <CustomInput
          title="Name"
          placeHolder="Enter name..."
          name="name"
          stateValue={clientForm}
          setState={setClientForm}
        />
        <CustomInput
          title="Email"
          placeHolder="Enter email..."
          name="email"
          stateValue={clientForm}
          setState={setClientForm}
        />
        <CustomInput
          title="Phone Number"
          placeHolder="Enter phone number..."
          name="phoneNumber"
          stateValue={clientForm}
          setState={setClientForm}
        />
        <CustomInput
          title="Pet ID"
          placeHolder="Enter Pet Id..."
          name="petId"
          type="number"
          stateValue={clientForm}
          setState={setClientForm}
        />
        <CustomButton
          buttonText="Back"
          bg="black"
          color="white"
          func={() => {
            navigate("/clients");
          }}
        />
        <CustomButton
          buttonText="Create Client"
          bg="#00638e"
          color="white"
          func={createClientForm}
        />
      </div>
    </div>
  );
};

export default ClientForm;
