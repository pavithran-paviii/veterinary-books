import React, { useContext, useState } from "react";
import classNames from "./inventoryform.module.scss";
import CustomInput, { CustomButton, Toastify } from "../Custom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";

const InventoryForm = () => {
  const navigate = useNavigate();
  const { email } = useContext(GlobalContext);
  const [inventoryForm, setInventoryForm] = useState({});

  //functions

  function createInventoryForm() {
    inventoryForm.refMail = email;
    axios
      .post(BACKENDURL + "/inventory/create", inventoryForm)
      .then((response) => {
        if (response?.data?.status) {
          Toastify(response?.data?.message, "success");
          navigate("/inventory");
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "Create inventory response");
      })
      .catch((error) => {
        console.log(error, "Create inventory error");
        Toastify(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error",
          "error"
        );
      });
  }

  return (
    <div className={classNames.inventoryForm}>
      <h3 className={classNames.title}>Add Inventory</h3>
      <div className={classNames.inventoryFields}>
        <CustomInput
          title="Medicine Name"
          placeHolder="Enter medicine name..."
          name="medicineName"
          stateValue={inventoryForm}
          setState={setInventoryForm}
        />
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
          buttonText="Back"
          bg="black"
          color="white"
          func={() => {
            navigate("/inventory");
          }}
        />
        <CustomButton
          buttonText="Create Inventory"
          bg="#00638e"
          color="white"
          func={createInventoryForm}
        />
      </div>
    </div>
  );
};

export default InventoryForm;
