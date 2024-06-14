import React, { useContext, useEffect, useState } from "react";
import classNames from "./adddiagnosis.module.scss";
import axios from "axios";
import { BACKENDURL } from "../../../assets/data/constant";
import { GlobalContext } from "../../../context/globalContext";
import {
  CustomButton,
  CustomTextarea,
  Toastify,
} from "../../../components/Custom";

const AddDiagnosis = ({ petID }) => {
  const { token } = useContext(GlobalContext);
  const [createRecord, setCreateRecord] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [createRecordForm, setCreateRecordForm] = useState({});
  const [allUserDiagnosis, setAllUserDiagnosis] = useState({});
  const [allMedicalRecords, setAllMedicalRecords] = useState([]);

  //functions

  async function getAllDiagnosis() {
    try {
      let response = await axios.get(BACKENDURL + `/diagnosis`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setAllUserDiagnosis(response?.data?.data);
    } catch (error) {
      console.log(error?.message, "Error while trying to fetch pets!");
    }
  }

  async function getAllRecords(petID) {
    try {
      let response = await axios.get(BACKENDURL + `/medicalrecord/${petID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setAllMedicalRecords(response?.data?.data);
    } catch (error) {
      console.log(error?.message, "Error while trying to fetch records!");
    }
  }
  async function createPetRecords(petID) {
    setLocalLoading(true);
    createRecordForm.petID = petID;
    try {
      let response = await axios.post(
        BACKENDURL + `/medicalrecord`,
        createRecordForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status) {
        Toastify(response?.data?.message, "success");
        setLocalRefresh((prev) => !prev);
        setCreateRecord(false);
        setCreateRecordForm({});
      } else {
        Toastify(response?.data?.message, "error");
      }
      setLocalLoading(false);
    } catch (error) {
      console.log(error?.message, "Error while trying to fetch records!");
      setLocalLoading(false);
    }
  }

  //renderings

  useEffect(() => {
    getAllDiagnosis();
  }, []);

  useEffect(() => {
    if (petID) {
      getAllRecords(petID);
    }
  }, [petID, localRefresh]);

  return (
    <div className={classNames.addDiagnosis}>
      <div className={classNames.addForm}>
        {!createRecord ? (
          <div
            className={classNames.addBtn}
            onClick={() => setCreateRecord(true)}
          >
            Create record
          </div>
        ) : (
          <div className={classNames.newForm}>
            <div className={classNames.title}>Add record</div>
            <CustomTextarea
              title="Clinical Signs"
              placeHolder="Enter clinical signs..."
              name="clinicalSigns"
              stateValue={createRecordForm}
              setState={setCreateRecordForm}
            />
            <EachDiagnosis
              allUserDiagnosis={allUserDiagnosis}
              diagnosisType={"tentativeDiagnosis"}
              createRecordForm={createRecordForm}
              setCreateRecordForm={setCreateRecordForm}
              title={"Tentative Diagnosis"}
            />
            <EachDiagnosis
              allUserDiagnosis={allUserDiagnosis}
              diagnosisType={"confirmativeDiagnosis"}
              createRecordForm={createRecordForm}
              setCreateRecordForm={setCreateRecordForm}
              title={"Confirmative Diagnosis"}
            />
            <CustomTextarea
              title="Treatment"
              placeHolder="Enter treatment..."
              name="treatment"
              stateValue={createRecordForm}
              setState={setCreateRecordForm}
            />
            <div className={classNames.btnsContainer}>
              <CustomButton
                buttonText="Cancel"
                bg="black"
                color="white"
                func={() => {
                  setCreateRecord(false);
                }}
              />
              <CustomButton
                buttonText="Create"
                bg="#00638e"
                color="white"
                func={() => {
                  if (petID) {
                    createPetRecords(petID);
                  }
                }}
                loading={localLoading}
              />
            </div>
          </div>
        )}
      </div>
      <div className={classNames.oldDiagnosis}>
        {Array.isArray(allMedicalRecords) &&
          allMedicalRecords?.length > 0 &&
          allMedicalRecords?.map((eachDiagnosis, index) => {
            return (
              <div
                className={classNames.eachDiagnosis}
                key={eachDiagnosis?._id}
              >
                {eachDiagnosis?.clinicalSigns && (
                  <CustomTextarea
                    title="Clinical Signs"
                    placeHolder="Enter clinical signs..."
                    name="clinicalSigns"
                    stateValue={eachDiagnosis}
                    setState={setCreateRecordForm}
                  />
                )}
                <EachDiagnosisView
                  allUserDiagnosis={eachDiagnosis}
                  diagnosisType={"tentativeDiagnosis"}
                  title={"Tentative Diagnosis"}
                />
                <EachDiagnosisView
                  allUserDiagnosis={eachDiagnosis}
                  diagnosisType={"confirmativeDiagnosis"}
                  title={"Confirmative Diagnosis"}
                />
                {eachDiagnosis?.treatment && (
                  <CustomTextarea
                    title="Treatment"
                    placeHolder="Enter treatment..."
                    name="treatment"
                    stateValue={eachDiagnosis}
                    //   setState={setCreateRecordForm}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddDiagnosis;

const EachDiagnosis = ({
  allUserDiagnosis,
  diagnosisType,
  createRecordForm,
  setCreateRecordForm,
  title,
}) => {
  return (
    <div className={classNames.addDiagnosisForm}>
      <div className={classNames.title}>{title}</div>
      <div className={classNames.allDiagnosis}>
        {Array.isArray(allUserDiagnosis[diagnosisType]) &&
          allUserDiagnosis[diagnosisType]?.length > 0 &&
          allUserDiagnosis[diagnosisType]?.map((eachDiagnosis, index) => {
            return (
              <div
                className={
                  createRecordForm[diagnosisType]?.includes(eachDiagnosis) &&
                  classNames.selectedDiagnosis
                }
                onClick={() =>
                  setCreateRecordForm((prev) => {
                    return {
                      ...prev,
                      [diagnosisType]: prev[diagnosisType]?.includes(
                        eachDiagnosis
                      )
                        ? prev[diagnosisType].filter(
                            (item) => item !== eachDiagnosis
                          )
                        : prev[diagnosisType]?.length > 0
                        ? [...prev[diagnosisType], eachDiagnosis]
                        : [eachDiagnosis],
                    };
                  })
                }
              >
                {eachDiagnosis}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const EachDiagnosisView = ({ allUserDiagnosis, diagnosisType, title }) => {
  return (
    <div
      className={classNames.addDiagnosisForm}
      style={{
        display:
          allUserDiagnosis[diagnosisType] &&
          Array.isArray(allUserDiagnosis[diagnosisType]) &&
          allUserDiagnosis[diagnosisType]?.length < 1
            ? "none"
            : "",
      }}
    >
      <div className={classNames.title}>{title}</div>
      <div className={classNames.allDiagnosis}>
        {Array.isArray(allUserDiagnosis[diagnosisType]) &&
          allUserDiagnosis[diagnosisType]?.length > 0 &&
          allUserDiagnosis[diagnosisType]?.map((eachDiagnosis, index) => {
            return (
              <div className={classNames.selectedDiagnosis}>
                {eachDiagnosis}
              </div>
            );
          })}
      </div>
    </div>
  );
};
