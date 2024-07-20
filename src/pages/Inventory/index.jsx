import React, { useContext, useEffect, useState } from "react";
import classNames from "./inventory.module.scss";
import { useNavigate } from "react-router-dom";
import CustomInput, {
  CustomButton,
  CustomSelectOne,
  Toastify,
} from "../../components/Custom";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Inventory = () => {
  const navigate = useNavigate();
  const { email, token, searchQuery, setSearchQuery } =
    useContext(GlobalContext);
  const [allInventory, setAllInventory] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [increaseInventory, setIncreaseInventory] = useState(false);
  const [inventoryForm, setInventoryForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [finalCart, setFinalCart] = useState({});

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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.item === product._id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.item === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            item: product._id,
            quantity: 1,
            price: product.retailPrice,
            name: product.medicineName,
            mrp: product.mrp,
          },
        ];
      }
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.item === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.item === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.item !== productId));
  };

  const calculateTotalCost = (items) => {
    return items.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.price);
    }, 0);
  };

  const removeFields = (items) => {
    return items.map(({ name, mrp, ...rest }) => rest);
  };

  async function submitBill() {
    const updatedCartItems = removeFields(cart);
    finalCart.totalAmount = calculateTotalCost(cart);
    finalCart.items = updatedCartItems;

    try {
      let response = await axios.post(
        BACKENDURL + "/inventory/billing",
        finalCart,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response cart added!");
      if (response?.data?.status) {
        Toastify("Bill Successful!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        Toastify(response?.data?.message, "error");
      }
    } catch (error) {
      Toastify("Server error while submitting bill", "error");
      console.log(error?.message, "Server error while submitting bill");
    }
  }

  //renderings

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
            allInventory.length > 0 &&
            allInventory
              .filter((eachinventory) => {
                let searchText = searchQuery?.toLowerCase();
                return eachinventory?.medicineName
                  ?.toLowerCase()
                  ?.includes(searchText);
              })
              .map((eachProduct) => {
                const cartItem = cart.find(
                  (item) => item.item === eachProduct._id
                );

                return (
                  <div className={classNames.eachProduct} key={eachProduct._id}>
                    <div className={classNames.detailsContainer}>
                      <div className={classNames.imageContainer}>
                        {eachProduct.medicineName.charAt(0)}
                      </div>
                      <div className={classNames.details}>
                        <div className={classNames.name}>
                          <span>{eachProduct.medicineName}</span>{" "}
                          <span>( {eachProduct.quantity} items available)</span>
                        </div>
                        <div className={classNames.price}>
                          <span>₹ {eachProduct.retailPrice}</span>
                          <span>₹ {eachProduct.mrp}</span>
                        </div>
                      </div>
                    </div>
                    <div className={classNames.controlBtns}>
                      <FaCircleMinus
                        onClick={() => decreaseQuantity(eachProduct._id)}
                      />
                      <input
                        type="text"
                        value={cartItem?.quantity || 0}
                        readOnly
                      />
                      <FaCirclePlus
                        className={
                          eachProduct.quantity <= cartItem?.quantity &&
                          classNames.notAllowedBtn
                        }
                        onClick={() => addToCart(eachProduct)}
                      />
                    </div>
                  </div>
                );
              })}
        </div>
        <div className={classNames.totalBill}>
          <div className={classNames.header}>
            <div className={classNames.title}>
              <div>Order Summary</div>
              <div>(Total Amount)</div>
            </div>
          </div>
          <div className={classNames.price}>
            ₹{" "}
            {calculateTotalCost(cart)
              ? calculateTotalCost(cart)?.toFixed(2)
              : "0.00"}
          </div>
        </div>

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
        <div className={classNames.title}>
          Cart
          <div className={classNames.paymentType}>
            <CustomSelectOne
              stateValue={finalCart}
              setState={setFinalCart}
              name="billingType"
              allOptions={[{ name: "Online" }, { name: "Cash" }]}
            />
          </div>
        </div>

        <div className={classNames.cartItems}>
          {Array.isArray(cart) &&
            cart?.length > 0 &&
            cart?.map((eachCartItem) => {
              return (
                <div className={classNames.eachProduct} key={eachCartItem.item}>
                  <div className={classNames.detailsContainer}>
                    <div className={classNames.imageContainer}>
                      {eachCartItem.name.charAt(0)}
                    </div>
                    <div className={classNames.details}>
                      <div className={classNames.name}>{eachCartItem.name}</div>
                      <div className={classNames.price}>
                        <span>₹ {eachCartItem.price}</span>
                        <span>₹ {eachCartItem.mrp}</span>
                      </div>
                    </div>
                  </div>
                  <div className={classNames.cartBtns}>
                    <div className={classNames.eachTotal}>
                      <div>{eachCartItem?.quantity} Quantity</div>
                      <div>
                        ₹{" "}
                        {(
                          eachCartItem?.quantity * eachCartItem?.price
                        )?.toFixed(2)}
                      </div>
                    </div>
                    <div
                      className={classNames.deleteBtn}
                      onClick={() => removeFromCart(eachCartItem?.item)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={`${classNames.paymentBtn} ${
            !(
              Array.isArray(cart) &&
              cart?.length > 0 &&
              finalCart?.billingType
            ) && classNames.notAllowedBtn
          }`}
          onClick={submitBill}
        >
          Confirm Payment
        </div>
      </div>
    </div>
  );
};

export default Inventory;
