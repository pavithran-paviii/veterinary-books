import React from "react";
import classNames from "./dynamicTable.module.scss";
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
import { MdDeleteOutline } from "react-icons/md";

const DynamicTable = ({
  tableHead,
  tableBody,
  mapArray,
  searchQuery,
  outlineFunc,
  mainFunc,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead?.map((eachHead, index) => {
              return <TableCell key={eachHead + index}>{eachHead}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(mapArray) && mapArray?.length > 0
            ? mapArray
                ?.filter((eachBill) => {
                  let searchText = searchQuery?.toLowerCase();
                  if (eachBill?.name) {
                    return eachBill?.name?.toLowerCase()?.includes(searchText);
                  } else {
                    return eachBill;
                  }
                })
                ?.map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => mainFunc(row)}
                  >
                    {Array.isArray(tableBody) && tableBody?.length > 0
                      ? tableBody?.map((eachItem, index) => {
                          console.log(row, eachItem, "row[eachItem]");
                          return (
                            <TableCell
                              component="th"
                              scope="row"
                              key={eachItem + index}
                            >
                              {eachItem === "outline" ? (
                                <MdDeleteOutline
                                  onClick={() => outlineFunc(eachItem?._id)}
                                />
                              ) : eachItem && row[eachItem] ? (
                                row[eachItem]
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          );
                        })
                      : ""}
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
  );
};

export default DynamicTable;
