import React, { useContext, useEffect, useState } from "react";
import classNames from "./clients.module.scss";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  EachCustomDatePicker,
  Toastify,
} from "../../components/Custom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Clients = () => {
  const navigate = useNavigate();
  const { email } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [allClients, setAllClients] = useState([]);
  const [nextRemainder, setNextRemainder] = useState("");
  const [nextRemainderForm, setNextRemainderForm] = useState({});

  //functions

  function getAllClients() {
    axios
      .get(BACKENDURL + `/client/${email}`)
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

  function updateInventoryItem() {
    nextRemainderForm.email = nextRemainder;
    axios
      .put(BACKENDURL + "/client/update", nextRemainderForm)
      .then((response) => {
        setNextRemainder(false);
        if (response?.data?.status) {
          window?.location?.reload();
          Toastify(response?.data?.message, "success");
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "Update client remainder response");
      })
      .catch((error) => {
        console.log(error, "Update client remainder error");
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
              <th>Remainder dates</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allClients?.length > 0 &&
              allClients
                ?.filter((eachClient) => {
                  let searchText = searchQuery?.toLowerCase();
                  return (
                    eachClient?.email?.includes(searchText) ||
                    eachClient?.name?.includes(searchText)
                  );
                })
                .map((eachItem, index) => {
                  return (
                    <tr key={eachItem?.name + index}>
                      <td>{eachItem?.name}</td>
                      <td>{eachItem?.email}</td>
                      <td>{eachItem?.phoneNumber}</td>
                      <td>
                        {eachItem?.remainderDates?.length > 0
                          ? eachItem?.remainderDates
                              ?.map((dateString) => new Date(dateString))
                              .sort((a, b) => a - b)
                              .map((eachDate, index) => {
                                return (
                                  <div
                                    key={"remainderdate" + index}
                                    style={{ marginBottom: "0.5rem" }}
                                  >
                                    {new Date(eachDate).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </div>
                                );
                              })
                          : "-"}
                      </td>
                      <td>
                        <CiEdit
                          onClick={() => setNextRemainder(eachItem?.email)}
                        />
                      </td>
                      <td>
                        <MdDeleteOutline />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {nextRemainder ? (
        <div className={classNames.nextRemainder}>
          <div
            className={classNames.overlayContainer}
            onClick={() => setNextRemainder(false)}
          ></div>
          <div className={classNames.increaseContainer}>
            <div className={classNames.title}>Select Next Remainder</div>
            <div className={classNames.inventoryFields}>
              <EachCustomDatePicker
                title=""
                placeholder="Select next remainder"
                name="remainderDate"
                stateValue={nextRemainderForm}
                setState={setNextRemainderForm}
              />
              <CustomButton
                buttonText="Update Inventory"
                bg="#00638e"
                color="white"
                func={updateInventoryItem}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Clients;
