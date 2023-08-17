import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import { customersSelectors } from "../features/customers-selector";
import { loadingCustomers } from "../features/customers-slice";

function CustomerTable() {
  const customers = useAppSelector(customersSelectors);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadingCustomers());
  }, []);
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Customer information
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email Adress</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Zip</TableCell>
              <TableCell align="right">Adress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer,idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.email}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color:
                      customer.status === "Invalid" ||
                      customer.status === "Bounced"
                        ? "#da98fe"
                        : "#d791a4",
                  }}
                >
                  {customer.status}
                </TableCell>
                <TableCell align="right">{customer.name}</TableCell>
                <TableCell align="right">{customer.country}</TableCell>
                <TableCell align="right">{customer.postalZip}</TableCell>
                <TableCell align="right">{customer.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomerTable;
