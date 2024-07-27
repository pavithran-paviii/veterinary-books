import React, { useContext, useEffect, useState } from "react";
import classNames from "./pets.module.scss";
import { useNavigate } from "react-router-dom";
import PetsForm from "../../components/PetsForm";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { MdDeleteOutline } from "react-icons/md";
import { Toastify } from "../../components/Custom";
import AllTabs from "./Subtabs/AllTabs";
import DynamicTable from "../../components/DynamicTable";

const Pets = () => {
  const navigate = useNavigate();
  const { email, token, searchQuery, setSearchQuery } =
    useContext(GlobalContext);

  //local states
  const [allPets, setAllPets] = useState([]);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [localStep, setLocalStep] = useState("");
  const [selectedPet, setSelectedPet] = useState("");

  //functions

  async function getAllPets() {
    try {
      let response = await axios.get(BACKENDURL + `/pet`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setAllPets(response?.data?.data);
    } catch (error) {
      console.log(error?.message, "Error while trying to fetch pets!");
    }
  }

  async function deletePet(petID) {
    try {
      let response = await axios.delete(BACKENDURL + `/pet/${petID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.status) {
        setLocalRefresh((prev) => !prev);
        Toastify(response?.data?.message, "success");
      } else {
        Toastify(response?.data?.message, "error");
      }
    } catch (error) {
      Toastify(error?.response?.data?.message, "error");
      console.log(error?.message, "Error while deleting pet!");
    }
  }

  useEffect(() => {
    getAllPets();
  }, [localRefresh]);

  return (
    <div className={classNames.client}>
      {localStep === "createPet" ? (
        <PetsForm
          setLocalStep={setLocalStep}
          setLocalRefresh={setLocalRefresh}
        />
      ) : localStep ? (
        <AllTabs selectedPet={selectedPet} setLocalStep={setLocalStep} />
      ) : (
        <>
          <div className={classNames.topBar}>
            <button
              className={classNames.addClient}
              onClick={() => {
                setLocalStep("createPet");
              }}
            >
              Add Pets
            </button>
          </div>
          <DynamicTable
            tableHead={["Name", "Age", "Gender", "Type", "Weight", ""]}
            mapArray={allPets}
            tableBody={["name", "age", "sex", "type", "weight", "outline"]}
            searchQuery={searchQuery}
            outlineFunc={deletePet}
            mainFunc={(obj) => {
              setLocalStep(obj?._id);
              setSelectedPet(obj);
            }}
            filterItem={"name"}
          />
        </>
      )}
    </div>
  );
};

export default Pets;
