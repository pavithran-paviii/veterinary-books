import React, { useEffect, useState } from "react";
import classNames from "./clients.module.scss";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../../components/Custom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";

const Clients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allClients, setAllClients] = useState([]);

  //functions

  function getAllClients() {
    axios
      .get(BACKENDURL + "/client")
      .then((response) => {
        setAllClients(response?.data?.data);
        console.log(response, "all clients response");
      })
      .catch((error) => {
        console.log(error, "all clients error");
        Toastify(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error",
          "error"
        );
      });
  }

  useEffect(() => {
    getAllClients();
  }, []);

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
      <div
        className={classNames.tableContainer}
        style={{ display: allClients?.length > 0 ? "" : "none" }}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {allClients?.length > 0 &&
              allClients?.map((eachItem, index) => {
                return (
                  <tr key={eachItem?.name + index}>
                    <td>{eachItem?.name}</td>
                    <td>{eachItem?.email}</td>
                    <td>{eachItem?.phoneNumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
