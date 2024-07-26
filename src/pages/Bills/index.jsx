import React, { useContext, useEffect, useState } from "react";
import classNames from "./bills.module.scss";

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

const Bills = () => {
  const { token } = useContext(GlobalContext);
  const [allBills, setAllBills] = useState([]);

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
      }

      console.log(response, "get all bills response");
    } catch (error) {
      console.log(error?.message, "Get all bills error");
    }
  }

  //renderings

  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <div className={classNames.bills}>
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
            {Array.isArray(allBills) &&
              allBills?.length > 0 &&
              allBills?.map((row) => (
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
                    {row.createdAt ? moment(row.createdAt).format("LLL") : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Bills;
