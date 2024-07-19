import React, { useContext, useEffect, useState } from "react";
import classNames from "./inventory.module.scss";
import { useNavigate } from "react-router-dom";
import CustomInput, { CustomButton, Toastify } from "../../components/Custom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Inventory = () => {
  const navigate = useNavigate();
  const { email, token, searchQuery, setSearchQuery } =
    useContext(GlobalContext);
  const [allInventory, setAllInventory] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [increaseInventory, setIncreaseInventory] = useState(false);
  const [inventoryForm, setInventoryForm] = useState(false);

  //functions

  function getAllInventory() {
    axios
      .get(BACKENDURL + `/inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
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
    inventoryForm.medicineName = selectedMedicine;
    axios
      .put(BACKENDURL + "/inventory/update", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: inventoryForm,
      })
      .then((response) => {
        setIncreaseInventory(false);
        if (response?.data?.status) {
          window?.location?.reload();
          Toastify(response?.data?.message, "success");
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
          <div className={classNames.stockItems}>150 Items</div>
          <div className={classNames.stockValue}>₹ 2,00,000</div>
        </div>
        <div>
          <div className={classNames.title}>Inventory Stocks</div>
          <div className={classNames.stockItems}>96 Items</div>
          <div className={classNames.stockValue}>₹ 1,43,000</div>
        </div>
        <div>
          <div className={classNames.title}>Upcoming Stocks</div>
          <div className={classNames.stockItems}>54 Items</div>
          <div className={classNames.stockValue}>₹ 57,000</div>
        </div>
      </div>
      <div className={classNames.topBar}>
        {/* <div className={classNames.detailedSearch}>
          <input
            type="text"
            className={classNames.searchOption}
            placeholder="Search inventory..."
            onChange={(event) => setSearchQuery(event?.target?.value)}
          />
        </div> */}
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
              <th></th>
              <th></th>
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
                      <td>
                        <CiEdit
                          onClick={() => {
                            setSelectedMedicine(eachItem?.medicineName);
                            setIncreaseInventory([]);
                          }}
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
      {increaseInventory ? (
        <div className={classNames.increaseInventory}>
          <div
            className={classNames.overlayContainer}
            onClick={() => setIncreaseInventory(false)}
          ></div>
          <div className={classNames.increaseContainer}>
            <div className={classNames.title}>{selectedMedicine}</div>
            <div className={classNames.inventoryFields}>
              <CustomInput
                title="Quantity"
                placeHolder="Enter quantity..."
                name="quantity"
                type="number"
                stateValue={inventoryForm}
                setState={setInventoryForm}
              />
              <CustomInput
                title="Pic"
                placeHolder="Enter pic link..."
                name="pic"
                stateValue={inventoryForm}
                setState={setInventoryForm}
              />
              <CustomInput
                title="Description"
                placeHolder="Enter description..."
                name="description"
                stateValue={inventoryForm}
                setState={setInventoryForm}
              />
              <CustomInput
                title="MRP"
                placeHolder="Enter MRP..."
                name="mrp"
                type="number"
                stateValue={inventoryForm}
                setState={setInventoryForm}
              />
              <CustomInput
                title="Price"
                placeHolder="Enter price..."
                name="price"
                type="number"
                stateValue={inventoryForm}
                setState={setInventoryForm}
              />
              <CustomButton
                buttonText="Update Inventory"
                bg="#00638e"
                color="white"
                func={updateInventoryItem}
              />
            </div>
            {/* <CustomInput
              placeHolder="Enter additional quantity..."
              stateValue={increaseInventory}
              setState={setIncreaseInventory}
            /> */}
            {/* <button
              className={classNames.addinventory}
              onClick={() => {
                updateInventoryItem();
              }}
            >
              Update Inventory Quantity
            </button> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Inventory;
