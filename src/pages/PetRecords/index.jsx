import React, { useState } from "react";
import classNames from "./petrecords.module.scss";
import { useNavigate } from "react-router-dom";

const PetRecords = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={classNames.client}>
      <div className={classNames.topBar}>
        <input
          type="text"
          className={classNames.searchOption}
          placeholder="Search records..."
          onChange={(event) => setSearchQuery(event?.target?.value)}
        />
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
