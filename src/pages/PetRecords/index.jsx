import React, { useContext, useEffect, useState } from "react";
import classNames from "./petrecords.module.scss";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";
import { BACKENDURL } from "../../assets/data/constant";
import { Toastify } from "../../components/Custom";
import axios from "axios";
import DynamicTable from "../../components/DynamicTable";

const PetRecords = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, token } = useContext(GlobalContext);
  const [allPetRecords, setAllPetRecords] = useState([]);

  //functions

  function getAllMedicalRecords() {
    axios
      .get(BACKENDURL + `/medicalrecord`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.status) {
          setAllPetRecords(response?.data?.data);
        }
        console.log(response, "all pet records response");
      })
      .catch((error) => {
        console.log(error, "all pet records error");
        Toastify(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error",
          "error"
        );
      });
  }

  //renderings

  useEffect(() => {
    getAllMedicalRecords();
  }, []);

  return (
    <div className={classNames.client}>
      <div className={classNames.topBar}>
        <button
          className={classNames.addClient}
          onClick={() => {
            navigate("/records/create");
          }}
        >
          Add Records
        </button>
      </div>
      <DynamicTable
        tableHead={[
          "Name",
          "Age",
          "Gender",
          "Weight",
          "Clinical Signs",
          "Treatment",
        ]}
        mapArray={allPetRecords}
        tableBody={[
          "name",
          "age",
          "sex",
          "weight",
          "clinicalSigns",
          "treatment",
        ]}
        searchQuery={searchQuery}
        // outlineFunc={deletePet}
        // mainFunc={(obj) => {
        //   setLocalStep(obj?._id);
        //   setSelectedPet(obj);
        // }}
        filterItem={"name"}
      />
    </div>
  );
};

export default PetRecords;
