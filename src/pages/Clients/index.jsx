import React, { useContext, useEffect, useState } from "react";
import classNames from "./clients.module.scss";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  EachCustomDatePicker,
  Toastify,
} from "../../components/Custom";
import axios, { Axios } from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import "moment-timezone";
moment.tz.setDefault("Asia/Kolkata");
//table

const Clients = () => {
  const navigate = useNavigate();
  const { email, token, searchQuery, setSearchQuery } =
    useContext(GlobalContext);
  const [allClients, setAllClients] = useState([]);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [nextRemainder, setNextRemainder] = useState("");
  const [nextRemainderForm, setNextRemainderForm] = useState({});

  //functions

  function getAllClients() {
    axios
      .get(BACKENDURL + `/client`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
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

  function updateClientRemainder() {
    console.log(nextRemainder, "nextRemainder");
    nextRemainderForm.phoneNumber = nextRemainder?.phoneNumber;
    nextRemainderForm.refID = nextRemainder?._id;
    axios
      .put(BACKENDURL + "/client/update", nextRemainderForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNextRemainder(false);
        if (response?.data?.status) {
          setLocalRefresh((prev) => !prev);
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

  async function deleteClient(clientID) {
    try {
      let response = await axios.delete(BACKENDURL + `/client/${clientID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.status) {
        setLocalRefresh((prev) => !prev);
        Toastify(response?.data?.message, "success");
      } else {
        Toastify(response?.data?.message, "error");
      }
    } catch (error) {
      Toastify(error?.response?.data?.message, "error");
      console.log(error?.message, "Error while deleting client");
    }
  }

  useEffect(() => {
    getAllClients();
  }, [localRefresh]);

  return (
    <div className={classNames.client}>
      <div className={classNames.topBar}>
        <button
          className={classNames.addClient}
          onClick={() => {
            if (nextRemainder) {
              setNextRemainderForm({});
              setNextRemainder("");
            } else {
              navigate("/clients/create");
            }
          }}
        >
          {nextRemainder ? "Back" : "Add Client"}
        </button>
      </div>
      {nextRemainder ? (
        <div className={classNames.nextRemainder}>
          <div className={classNames.increaseContainer}>
            <div className={classNames.title}>
              Select Next Remainder For {nextRemainder?.name}
            </div>
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
                func={updateClientRemainder}
              />

              <div
                className={classNames.remainderDate}
                style={{
                  visibility: nextRemainderForm?.remainderDate ? "" : "hidden",
                  pointerEvents: nextRemainderForm?.remainderDate ? "" : "none",
                }}
              >
                Next remainder is set on{" "}
                <span>
                  {moment(nextRemainderForm.remainderDate)
                    .tz("Asia/Kolkata")
                    .format("MMMM D, YYYY, h:mm A")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Remainder dates</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(allClients) && allClients?.length > 0
                ? allClients
                    ?.filter((eachBill) => {
                      let searchText = searchQuery?.toLowerCase();
                      if (eachBill?.name) {
                        return eachBill?.name
                          ?.toLowerCase()
                          ?.includes(searchText);
                      } else {
                        return eachBill;
                      }
                    })
                    ?.map((row, index) => (
                      <TableRow
                        key={row?._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        // onClick={() => mainFunc(row)}
                      >
                        <TableCell component="th" scope="row" key={row + index}>
                          {row?.name}
                        </TableCell>
                        <TableCell component="th" scope="row" key={row + index}>
                          {row?.email}
                        </TableCell>
                        <TableCell component="th" scope="row" key={row + index}>
                          {row?.phoneNumber}
                        </TableCell>
                        <TableCell component="th" scope="row" key={row + index}>
                          {row?.remainderDates?.length > 0
                            ? row?.remainderDates
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
                        </TableCell>
                        <TableCell component="th" scope="row" key={row + index}>
                          {nextRemainder === row?.phoneNumber ? (
                            <IoMdClose
                              onClick={() => {
                                setNextRemainderForm({});
                                setNextRemainder("");
                              }}
                            />
                          ) : (
                            <CiEdit
                              onClick={() => {
                                setNextRemainderForm({});
                                setNextRemainder(row);
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row" key={row + index}>
                          <MdDeleteOutline
                            onClick={() => deleteClient(row?._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                : Array.from({ length: 4 })?.map((eachLoading, index) => {
                    return (
                      <TableRow
                        key={"billsLoading" + index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Skeleton height={15} />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton height={15} />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton height={15} />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton height={15} />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton height={15} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Clients;
