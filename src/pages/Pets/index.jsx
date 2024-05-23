import React, { useState } from "react";
import classNames from "./pets.module.scss";
import { useNavigate } from "react-router-dom";
import PetsForm from "../../components/PetsForm";

const Pets = () => {
  const navigate = useNavigate();

  //local states
  const [searchQuery, setSearchQuery] = useState("");
  const [localStep, setLocalStep] = useState("");

  return (
    <div className={classNames.client}>
      {localStep === "createPet" ? (
        <PetsForm setLocalStep={setLocalStep} />
      ) : (
        <>
          <div className={classNames.topBar}>
            <input
              type="text"
              className={classNames.searchOption}
              placeholder="Search pets..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event?.target?.value)}
            />
            <button
              className={classNames.addClient}
              onClick={() => {
                setLocalStep("createPet");
              }}
            >
              Add Pets
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pets;
