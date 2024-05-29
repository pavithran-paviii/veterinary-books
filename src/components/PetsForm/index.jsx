import React, { useContext, useEffect, useState } from "react";
import classNames from "./petsform.module.scss";
import CustomInput, {
  CustomButton,
  CustomDropdown,
  CustomSelectOne,
  Toastify,
} from "../Custom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";

//assets
import { MdDelete } from "react-icons/md";
import dogProfile from "../../assets/images/Profile/dog.svg";
import catProfile from "../../assets/images/Profile/cat.svg";
import vetenerianProfile from "../../assets/images/Profile/veterinarian.svg";

const PetsForm = ({ type, setLocalStep, setLocalRefresh, data }) => {
  const navigate = useNavigate();
  const { email } = useContext(GlobalContext);

  //local states
  const [petsForm, setPetsForm] = useState({});
  const [allClients, setAllClients] = useState([]);
  const [profileImageLocal, setProfileImageLocal] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  //functions

  function createPetsForm() {
    setLocalLoading(true);
    petsForm.refMail = email;

    const petFormData = new FormData();

    for (const key in petsForm) {
      petFormData.append(key, petsForm[key]);
    }

    console.log(petFormData);

    axios
      .post(BACKENDURL + "/pet", petFormData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the content type
        },
      })
      .then((response) => {
        if (response?.data?.status) {
          Toastify(response?.data?.message, "success");
          setLocalStep("");
          setLocalRefresh((prev) => !prev);
        } else {
          Toastify(response?.data?.message, "error");
        }
        setLocalLoading(false);
      })
      .catch((error) => {
        console.log(error, "Create pets error");
        setLocalLoading(false);
        Toastify(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error",
          "error"
        );
      });
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

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImageLocal(reader.result);
      };
      setPetsForm({
        ...petsForm,
        pic: file, // Set the uploaded photo in state
      });
      // console.log(reader, "Uploaded URL reader", reader.result);
    }
  };

  useEffect(() => {
    if (email && type !== "readOnly") {
      getAllClients();
    }

    if (type === "readOnly") {
      console.log(data, "readonly data");
      setPetsForm(data);
    }
  }, []);

  return (
    <div
      className={classNames.recordsForm}
      style={{ pointerEvents: type === "readOnly" ? "none" : "" }}
    >
      {/* <h3 className={classNames.title}>Create New Pet</h3> */}
      <div className={classNames.imageUploadContainer}>
        <div className={classNames.imageUpload}>
          <img
            src={
              type === "readOnly"
                ? petsForm?.pic
                : profileImageLocal
                ? profileImageLocal
                : petsForm?.type === "Dog"
                ? dogProfile
                : petsForm?.type === "Cat"
                ? catProfile
                : vetenerianProfile
            }
            alt="dogProfile"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          className={classNames.uploadProfile}
          id="profilePicUpload"
          onChange={handleFileInputChange}
        />
        {type === "readOnly" ? (
          ""
        ) : (
          <CustomButton
            buttonText="Upload"
            bg="#00638e"
            color="white"
            func={() => {
              document.getElementById("profilePicUpload").click();
            }}
          />
        )}
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
        <CustomInput
          title="Weight"
          placeHolder="Enter weight..."
          name="weight"
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
          editable={type === "readOnly" ? false : true}
        />
        <CustomSelectOne
          stateValue={petsForm}
          setState={setPetsForm}
          name="sex"
          title="Gender"
          allOptions={[{ name: "Male" }, { name: "Female" }]}
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
          editable={type === "readOnly" ? false : true}
        />
        {type === "readOnly" ? (
          ""
        ) : (
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
              loading={localLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PetsForm;
