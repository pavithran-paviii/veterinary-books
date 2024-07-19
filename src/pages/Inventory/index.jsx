import React, { useContext, useEffect, useState } from "react";
import classNames from "./inventory.module.scss";
import { useNavigate } from "react-router-dom";
import CustomInput, { CustomButton, Toastify } from "../../components/Custom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

const Inventory = () => {
  const navigate = useNavigate();
  const { email, token, searchQuery, setSearchQuery } =
    useContext(GlobalContext);
  const [allInventory, setAllInventory] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [increaseInventory, setIncreaseInventory] = useState(false);
  const [inventoryForm, setInventoryForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
      <div className={classNames.productsContainer}>
        <div className={classNames.topBar}>
          <button
            className={classNames.addinventory}
            onClick={() => {
              navigate("/inventory/create");
            }}
          >
            Add inventory
          </button>
        </div>
        <div className={classNames.allProducts}>
          {Array.isArray(allInventory) &&
            allInventory?.length > 0 &&
            allInventory
              ?.filter((eachinventory) => {
                let searchText = searchQuery?.toLowerCase();
                return eachinventory?.medicineName
                  ?.toLowerCase()
                  ?.includes(searchText);
              })
              ?.map((eachProduct) => {
                return (
                  <div
                    className={classNames.eachProduct}
                    key={eachProduct?._id}
                  >
                    <div className={classNames.detailsContainer}>
                      <div className={classNames.imageContainer}>
                        {eachProduct?.medicineName?.charAt(0)}
                      </div>
                      <div className={classNames.details}>
                        <div className={classNames.name}>
                          {eachProduct?.medicineName}
                        </div>
                        <div className={classNames.price}>
                          <span>₹ {eachProduct?.retailPrice}</span>
                          <span>₹ {eachProduct?.mrp}</span>
                        </div>
                      </div>
                    </div>
                    <div className={classNames.controlBtns}>
                      <FaCircleMinus />
                      <input type="text" placeholder="0" />
                      <FaCirclePlus />
                    </div>
                  </div>
                );
              })}
        </div>
        {/* <div
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
                        <td>
                          {eachItem?.price ? `₹ ${eachItem?.price}` : "-"}
                        </td>
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
        </div> */}
        {/* {increaseInventory && (
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
            </div>
          </div>
        )} */}
      </div>
      <div className={classNames.cartContainer}>
        <div className={classNames.title}>Cart</div>
      </div>
    </div>
  );
};

export default Inventory;
