import React, { useState } from "react";
import classNames from "./alltabs.module.scss";
import PetsForm from "../../../components/PetsForm";

const AllTabs = ({ selectedPet, setLocalStep }) => {
  //constant
  const allSubTabs = ["Profile", "Medical records", "Vaccinations"];

  // states
  const [selectedTab, setSelectedTab] = useState("Profile");

  return (
    <div className={classNames.allTabs}>
      <div className={classNames.subTabs}>
        {allSubTabs?.map((eachTab, index) => {
          return (
            <div
              className={eachTab === selectedTab && classNames.selectedTab}
              key={eachTab + index}
              onClick={(event) => setSelectedTab(eachTab)}
            >
              {eachTab}
            </div>
          );
        })}
        <div className={classNames.mainBtns}>
          <button>Edit</button>
          <button
            onClick={() => {
              console.log("Working...");
              setLocalStep("");
            }}
          >
            Close
          </button>
        </div>
      </div>
      <div>
        <PetsForm
          type="readOnly"
          data={selectedPet}
          setLocalStep={setLocalStep}
        />
      </div>
    </div>
  );
};

export default AllTabs;
