import React, { useContext, useEffect, useState } from "react";
import classNames from "./bills.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import moment from "moment";
import { filterByDateRange } from "../../assets/functions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Bills = () => {
  const { token, searchQuery } = useContext(GlobalContext);
  const [allBills, setAllBills] = useState([]);
  const [allBillsFiltered, setAllBillsFiltered] = useState([]);

  //functions
  async function getAllBills() {
    try {
      let response = await axios.get(BACKENDURL + "/inventory/getbills", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.status) {
        setAllBills(response?.data?.data);
        setAllBillsFiltered(response?.data?.data);
      }

      console.log(response, "get all bills response");
    } catch (error) {
      console.log(error?.message, "Get all bills error");
    }
  }

  const handleDateChange = (startDate, endDate) => {
    const filtered = filterByDateRange(allBills, startDate, endDate);
    setAllBillsFiltered(filtered);
  };

  //renderings

  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <div className={classNames.bills}>
      <div className={classNames.header}>
        <div className={classNames.title}>Bills</div>
        <DatePickerComponent onDateChange={handleDateChange} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Billing Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(allBillsFiltered) && allBillsFiltered?.length > 0
              ? allBillsFiltered
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
                  ?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.name ? row?.name : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row?.phoneNumber ? row?.phoneNumber : "-"}
                      </TableCell>
                      <TableCell align="right">{row.billingType}</TableCell>
                      <TableCell align="right">{row.totalAmount}</TableCell>
                      <TableCell align="right">
                        {row.createdAt
                          ? moment(row.createdAt).format("LLL")
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))
              : Array.from({ length: 4 })?.map((eachLoading, index) => {
                  return (
                    <TableRow
                      key={"billsLoading" + index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
    </div>
  );
};

export default Bills;

const DatePickerComponent = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div className={classNames.dateContainer}>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Select start date"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Select end date"
      />
      <div
        className={classNames.resetBtn}
        onClick={() => {
          setStartDate(null);
          setEndDate(null);
          onDateChange();
        }}
      >
        Reset
      </div>
    </div>
  );
};
