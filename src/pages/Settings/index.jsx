import React, { useContext, useEffect, useState } from "react";
import classNames from "./settings.module.scss";

import { jwtDecode } from "jwt-decode";

//const
import { settingsNavigations } from "../../assets/data/mapItems";
import { GlobalContext } from "../../context/globalContext";
import CustomInput, { CustomButton, Toastify } from "../../components/Custom";
import { BACKENDURL } from "../../assets/data/constant";
import axios from "axios";
import { EachDiagnosisView } from "../Pets/Subtabs/AddDiagnosis";

const Settings = () => {
  const [selectedNav, setSelectedNav] = useState("General");

  return (
    <div className={classNames.settings}>
      <div className={classNames.topSection}>
        <div className={classNames.title}>Settings</div>
        <div className={classNames.navigations}>
          {settingsNavigations?.map((eachNav, index) => {
            return (
              <div
                className={selectedNav === eachNav && classNames.selectedNav}
                key={eachNav + index}
                onClick={() => {
                  if (eachNav !== "Subscription" && eachNav !== "Support") {
                    setSelectedNav(eachNav);
                  }
                }}
              >
                {eachNav}
              </div>
            );
          })}
        </div>
      </div>
      <div className={classNames.contentSection}>
        {selectedNav === "General" ? (
          <ProfileSection />
        ) : selectedNav === "Constant" ? (
          <AddConstants />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Settings;

const ProfileSection = () => {
  const { token } = useContext(GlobalContext);

  const [userDetails, setUserDetails] = useState({});

  //renderings

  useEffect(() => {
    setUserDetails(jwtDecode(token || localStorage.getItem("VBtoken")));
  }, []);

  return (
    <div className={classNames.profileSection}>
      <div className={classNames.header}>
        <div className={classNames.title}>Your Profile</div>
        <div className={classNames.desc}>
          Please update your profile settings here
        </div>
      </div>
      <div className={classNames.allDetails}>
        <CustomInput
          title="Name"
          placeHolder=""
          name="username"
          stateValue={userDetails}
          // setState={setClientForm}
        />
        <CustomInput
          title="Email"
          placeHolder=""
          name="email"
          stateValue={userDetails}
          // setState={setClientForm}
        />
        <CustomInput
          title="Role"
          placeHolder=""
          name="role"
          stateValue={userDetails}
          // setState={setClientForm}
        />
      </div>
    </div>
  );
};

const AddConstants = () => {
  const { token } = useContext(GlobalContext);
  const [allUserDiagnosis, setAllUserDiagnosis] = useState({});
  const [newUserDiagnosisTentative, setNewserDiagnosisTentative] = useState("");
  const [newUserDiagnosisConfirmative, setNewserDiagnosisConfirmative] =
    useState("");

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

  async function createDiagnosis(type, diagnosis) {
    let obj = { tentativeDiagnosis: [], confirmativeDiagnosis: [] };

    if (type === "tentative") {
      obj.tentativeDiagnosis = [diagnosis];
    } else if (type === "confirmative") {
      obj.confirmativeDiagnosis = [diagnosis];
    }

    try {
      let response = await axios.post(BACKENDURL + `/diagnosis`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.status) {
        Toastify(response?.data?.message, "success");
        if (type === "tentative") {
          setAllUserDiagnosis((prev) => {
            return {
              ...prev,
              tentativeDiagnosis: [...prev?.tentativeDiagnosis, diagnosis],
            };
          });
          setNewserDiagnosisTentative("");
        } else if (type === "confirmative") {
          setAllUserDiagnosis((prev) => {
            return {
              ...prev,
              confirmativeDiagnosis: [
                ...prev?.confirmativeDiagnosis,
                diagnosis,
              ],
            };
          });
          setNewserDiagnosisConfirmative("");
        }
      } else {
        Toastify(response?.data?.message, "error");
      }
    } catch (error) {
      console.log(error?.message, "Error while trying to fetch pets!");
    }
  }

  //renderings

  useEffect(() => {
    getAllDiagnosis();
  }, []);

  return (
    <div className={classNames.addConstants}>
      <div className={classNames.header}>
        <div className={classNames.title}>Your Constant</div>
        <div className={classNames.desc}>
          Please add all constant variable for you dashboard here
        </div>
      </div>
      <div className={classNames.allDetails}>
        <div className={classNames.eachDiagnosisContainer}>
          <EachDiagnosisView
            allUserDiagnosis={allUserDiagnosis}
            diagnosisType={"tentativeDiagnosis"}
            title={"Tentative Diagnosis"}
          />
          <div className={classNames.newDiagnosisContainer}>
            <CustomInput
              placeHolder="Enter tentative diagnosis..."
              stateValue={newUserDiagnosisTentative}
              setState={setNewserDiagnosisTentative}
            />
            <CustomButton
              buttonText="Add"
              bg="#00638e"
              color="white"
              func={() =>
                createDiagnosis("tentative", newUserDiagnosisTentative)
              }
            />
          </div>
        </div>
        <div className={classNames.eachDiagnosisContainer}>
          <EachDiagnosisView
            allUserDiagnosis={allUserDiagnosis}
            diagnosisType={"confirmativeDiagnosis"}
            title={"Confirmative Diagnosis"}
          />
          <div className={classNames.newDiagnosisContainer}>
            <CustomInput
              placeHolder="Enter Confirmative diagnosis..."
              stateValue={newUserDiagnosisConfirmative}
              setState={setNewserDiagnosisConfirmative}
            />
            <CustomButton
              buttonText="Add"
              bg="#00638e"
              color="white"
              func={() =>
                createDiagnosis("confirmative", newUserDiagnosisConfirmative)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
