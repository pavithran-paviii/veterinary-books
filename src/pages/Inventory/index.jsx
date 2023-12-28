import React, { useContext, useEffect, useState } from "react";
import classNames from "./inventory.module.scss";
import { useNavigate } from "react-router-dom";
import CustomInput, { Toastify } from "../../components/Custom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";

const Inventory = () => {
  const navigate = useNavigate();
  const { email } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [allInventory, setAllInventory] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [increaseInventory, setIncreaseInventory] = useState(false);

  //functions

  function getAllInventory() {
    axios
      .get(BACKENDURL + `/inventory/${email}`)
      .then((response) => {
        setAllInventory(response?.data?.data);
        console.log(response, "all inventory response");
      })
      .catch((error) => {
        console.log(error, "all inventory error");
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
    axios
      .put(BACKENDURL + "/inventory/update", {
        medicineName: selectedMedicine,
        quantity: increaseInventory,
      })
      .then((response) => {
        setIncreaseInventory(false);
        if (response?.data?.status) {
          Toastify(response?.data?.message, "success");
          window?.location?.reload();
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "Update inventory response");
      })
      .catch((error) => {
        console.log(error, "Update inventory error");
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
    getAllInventory();
  }, []);

  return (
    <div className={classNames.inventory}>
      <div className={classNames.miniOverview}>
        <div>
          <div className={classNames.title}>Total Stocks</div>
          <div className={classNames.stockItems}>150 Quantity</div>
          <div className={classNames.stockValue}>₹ 2,00,000</div>
        </div>
        <div>
          <div className={classNames.title}>Inventory Stocks</div>
          <div className={classNames.stockItems}>96 Quantity</div>
          <div className={classNames.stockValue}>₹ 1,43,000</div>
        </div>
        <div>
          <div className={classNames.title}>Upcoming Stocks</div>
          <div className={classNames.stockItems}>54 Quantity</div>
          <div className={classNames.stockValue}>₹ 57,000</div>
        </div>
      </div>
      <div className={classNames.topBar}>
        <div className={classNames.detailedSearch}>
          <input
            type="text"
            className={classNames.searchOption}
            placeholder="Search inventory..."
            onChange={(event) => setSearchQuery(event?.target?.value)}
            style={{
              borderRadius: searchQuery ? "10px 10px 0 0" : "",
              borderBottom: searchQuery ? "none" : "",
            }}
          />
          <div
            className={classNames.searchDropdown}
            style={{ display: searchQuery ? "" : "none" }}
          >
            {allInventory?.length > 0 &&
              allInventory
                ?.filter((eachMedicine) => {
                  let search = searchQuery?.toLowerCase();
                  return eachMedicine?.medicineName?.includes(search);
                })
                .map((eachItem, index) => {
                  return (
                    <div
                      className={classNames.eachInventoryItem}
                      onClick={() => {
                        setSelectedMedicine(eachItem?.medicineName);
                        setIncreaseInventory([]);
                      }}
                    >
                      <span>{eachItem?.medicineName}</span>
                      <span>{eachItem?.quantity}</span>
                    </div>
                  );
                })}
          </div>
        </div>
        <button
          className={classNames.addinventory}
          onClick={() => {
            navigate("/inventory/create");
          }}
        >
          Add inventory
        </button>
      </div>
      <div
        className={classNames.tableContainer}
        style={{ display: allInventory?.length > 0 ? "" : "none" }}
      >
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {allInventory?.length > 0 &&
              allInventory
                ?.filter((eachinventory) => {
                  let searchText = searchQuery?.toLowerCase();
                  return eachinventory?.medicineName?.includes(searchText);
                })
                .map((eachItem, index) => {
                  return (
                    <tr key={eachItem?.name + index}>
                      <td>{eachItem?.medicineName}</td>
                      <td>{eachItem?.quantity}</td>
                      <td>{eachItem?.price ? `₹ ${eachItem?.price}` : "-"}</td>
                      <td>{eachItem?.description}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {increaseInventory ? (
        <div className={classNames.increaseInventory}>
          <div
            className={classNames.overlayContainer}
            onClick={() => setIncreaseInventory(false)}
          ></div>
          <div className={classNames.increaseContainer}>
            <div className={classNames.title}>{selectedMedicine}</div>
            <CustomInput
              placeHolder="Enter additional quantity..."
              stateValue={increaseInventory}
              setState={setIncreaseInventory}
            />
            <button
              className={classNames.addinventory}
              onClick={() => {
                updateInventoryItem();
              }}
            >
              Update Inventory Quantity
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Inventory;
