import React, { useContext, useState } from "react";
import classNames from "./petrecords.module.scss";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const PetRecords = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(GlobalContext);

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
      <div></div>
    </div>
  );
};

export default PetRecords;
