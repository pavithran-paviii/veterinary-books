import React, { useState } from "react";
import classNames from "./clients.module.scss";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={classNames.client}>
      <div className={classNames.topBar}>
        <input
          type="text"
          className={classNames.searchOption}
          placeholder="Search client..."
          onChange={(event) => setSearchQuery(event?.target?.value)}
        />
        <button
          className={classNames.addClient}
          onClick={() => {
            navigate("/clients/create");
          }}
        >
          Add Client
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Clients;
