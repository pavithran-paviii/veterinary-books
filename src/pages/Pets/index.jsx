import React, { useState } from "react";
import classNames from "./pets.module.scss";
import { useNavigate } from "react-router-dom";

const Pets = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={classNames.client}>
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
            navigate("/pets/create");
          }}
        >
          Add Pets
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Pets;
