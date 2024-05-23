import React, { useContext, useEffect, useState } from "react";
import classNames from "./petsform.module.scss";
import CustomInput, { CustomButton, CustomDropdown, Toastify } from "../Custom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";

//assets
import { MdDelete } from "react-icons/md";
import dogProfile from "../../assets/images/Profile/dog.svg";
import catProfile from "../../assets/images/Profile/cat.svg";
import vetenerianProfile from "../../assets/images/Profile/veterinarian.svg";

const PetsForm = ({ setLocalStep }) => {
  const navigate = useNavigate();
  const { email } = useContext(GlobalContext);

  //local states
  const [petsForm, setPetsForm] = useState({});
  const [allClients, setAllClients] = useState([]);

  //functions

  function createPetsForm() {
    console.log(petsForm, "petsForm");
    // axios
    //   .post(BACKENDURL + "/records", petsForm)
    //   .then((response) => {
    //     if (response?.data?.status) {
    //       Toastify(response?.data?.message, "success");
    //       navigate("/records");
    //     } else {
    //       Toastify(response?.data?.message, "error");
    //     }
    //     console.log(response, "Create records response");
    //   })
    //   .catch((error) => {
    //     console.log(error, "Create records error");
    //     Toastify(
    //       error?.response?.data?.message
    //         ? error?.response?.data?.message
    //         : error?.message,
    //       "error",
    //       "error"
    //     );
    //   });
  }

  function getAllClients() {
    axios
      .get(BACKENDURL + `/client/${email}`)
      .then((response) => {
        setAllClients(response?.data?.data);
        console.log(response, "all clients response");
      })
      .catch((error) => {
        console.log(error, "all clients error");
        Toastify(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error",
          "error"
        );
      });
  }

  useEffect(() => {
    if (email) {
      getAllClients();
    }
  }, []);

  return (
    <div className={classNames.recordsForm}>
      {/* <h3 className={classNames.title}>Create New Pet</h3> */}
      <div className={classNames.imageUploadContainer}>
        <div className={classNames.imageUpload}>
          <img
            src={
              petsForm?.type === "Dog"
                ? dogProfile
                : petsForm?.type === "Cat"
                ? catProfile
                : vetenerianProfile
            }
            alt="dogProfile"
          />
        </div>
        <CustomButton
          buttonText="Upload"
          bg="#00638e"
          color="white"
          // func={createPetsForm}
        />
        <MdDelete />
      </div>
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
        <CustomDropdown
          dropdown={["Dog", "Cat", "Others"]}
          name="type"
          title="Select Type"
          stateValue={petsForm}
          setState={setPetsForm}
          topTitle="true"
          type="single"
        />
        <CustomInput
          title="Breed"
          placeHolder="Enter breed..."
          name="breed"
          stateValue={petsForm}
          setState={setPetsForm}
        />
        <CustomDropdown
          dropdown={allClients}
          name="owner"
          title="Select Owner"
          stateValue={petsForm}
          setState={setPetsForm}
          topTitle="true"
          type="obj2Names"
          stateVal={"_id"}
          mapVal={{ name: "name", name1: "phoneNumber" }}
        />
        <div className={classNames.btnsContainer}>
          <CustomButton
            buttonText="Back"
            bg="black"
            color="white"
            func={() => {
              setLocalStep("");
            }}
          />
          <CustomButton
            buttonText="Create"
            bg="#00638e"
            color="white"
            func={createPetsForm}
          />
        </div>
      </div>
    </div>
  );
};

export default PetsForm;
